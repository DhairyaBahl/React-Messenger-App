import React from 'react';
import { View, Text } from 'react-native';
import { render, waitFor, mockReactInstance, nthChild } from './helpers';
import { MenuOptions, MenuTrigger } from '../src/index';
import MenuOutside from '../src/renderers/MenuOutside';
import Backdrop from '../src/Backdrop';
import MenuPlaceholder from '../src/MenuPlaceholder';
import ContextMenu from '../src/renderers/ContextMenu';
const { objectContaining, createSpy } = jasmine;

jest.dontMock('../src/MenuProvider');
jest.dontMock('../src/menuRegistry');

jest.mock('../src/helpers', () => ({
  deprecatedComponent: jest.fn(() => jest.fn()),
  measure: () => ({
    then: cb => cb({
      x: 0,
      y: 0,
      width: 100,
      height: 50,
    }),
  }),
  lo: x => x,
  isClassComponent: () => false,
  iterator2array: it => [...it],
}));

const {default: MenuProvider, PopupMenuContext} = require('../src/MenuProvider');

describe('MenuProvider', () => {

  /* eslint-disable react/display-name */
  function makeMenuStub(name) {
    let opened = false;
    return {
      getName: ()=>name,
      isOpen: ()=>opened,
      _getOpened: ()=>opened,
      _setOpened: (value)=>opened=value,
      _getTrigger: ()=>(<MenuTrigger/>),
      _getOptions: ()=>(<MenuOptions/>),
      props : {
        onOpen: createSpy(),
        onClose: createSpy(),
        onBackdropPress: createSpy(),
        type: 'context',
        renderer: ContextMenu,
      },
    }
  }

  const defaultLayout = {
    nativeEvent: {
      layout: {
        width: 400,
        height: 600,
      },
    },
  };

  let menu1;

  beforeEach(() => {
    menu1 = makeMenuStub('menu1');
  });

  // render menu provider in default configuration and call "standard" lifecycle methods
  function renderProvider(props) {
    const rendered = render(
      <MenuProvider {...props}/>
    );
    const { instance, output } = rendered;
    rendered.placeholder = mockReactInstance();
    instance._onPlaceholderRef(rendered.placeholder);
    // for tests mimic old ctx api
    const ctx = output.props.value
    instance.getChildContext = () => ctx
    // and "strip" context provider
    rendered.output = nthChild(output, 1)
    return rendered;
  }

  // renders placeholder and returns array of rendered backdrop and options
  function renderPlaceholderChildren(ctx) {
    const { output } = render(<MenuPlaceholder ctx={ctx} />);
    if (output === null) {
      return [];
    }
    return output.props.children;
  }

  it('should expose api', () => {
    const { instance } = render(
      <MenuProvider />
    );
    expect(typeof instance.openMenu).toEqual('function');
    expect(typeof instance.closeMenu).toEqual('function');
    expect(typeof instance.toggleMenu).toEqual('function');
    expect(typeof instance.isMenuOpen).toEqual('function');
    // context is now "renderer" -> see 'should render child components'
  });

  it('should render child components', () => {
    let { output } = render(
      <MenuProvider>
        <View />
        <Text>Some text</Text>
      </MenuProvider>
    );
    // check context
    expect(output.type).toEqual(PopupMenuContext.Provider);
    const { menuRegistry, menuActions }=output.props.value;
    expect(typeof menuRegistry).toEqual('object');
    expect(typeof menuActions).toEqual('object');
    expect(typeof menuActions.openMenu).toEqual('function');
    expect(typeof menuActions.closeMenu).toEqual('function');
    expect(typeof menuActions.toggleMenu).toEqual('function');
    expect(typeof menuActions.isMenuOpen).toEqual('function');
    // plus internal methods
    expect(typeof menuActions._notify).toEqual('function');
    // check the rest
    output = nthChild(output, 1)
    expect(output.type).toEqual(View);
    expect(typeof output.props.onLayout).toEqual('function');
    expect(output.props.children.length).toEqual(2);
    const [ components, safeArea ] = output.props.children;
    expect(safeArea.props.children.length).toEqual(2);
    const placeholder = safeArea.props.children[1];
    expect(components.type).toEqual(View);
    expect(placeholder.type).toEqual(MenuPlaceholder);
    expect(components.props.children).toEqual([
      <View />,
      <Text>Some text</Text>,
    ]);
  });

  it('should not render backdrop / options initially', () => {
    const { instance } = renderProvider();
    const [ backdrop, options ] = renderPlaceholderChildren(instance);
    expect(backdrop).toBeFalsy();
    expect(options).toBeFalsy();
  });

  it('should open menu', () => {
    const { output: initOutput, instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      expect(menuActions.isMenuOpen()).toEqual(true);
      expect(menu1._getOpened()).toEqual(true);
      initOutput.props.onLayout(defaultLayout);
      // next render will start rendering open menu
      const [ backdrop, options ] = renderPlaceholderChildren(instance);
      expect(backdrop.type).toEqual(Backdrop);
      expect(options.type).toEqual(MenuOutside);
      // on open was called only once
      expect(menu1.props.onOpen.calls.count()).toEqual(1);
    });
  });

  it('should close menu', () => {
    const { output: initOutput, instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() =>
      menuActions.closeMenu().then(() => {
        expect(menuActions.isMenuOpen()).toEqual(false);
        expect(menu1.props.onClose).toHaveBeenCalled();
        const [ backdrop, options ] = renderPlaceholderChildren(instance);
        expect(backdrop).toBeFalsy();
        expect(options).toBeFalsy();
      }));
  });

  it('should toggle menu', () => {
    const { instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    menuRegistry.subscribe(menu1);
    return menuActions.toggleMenu('menu1').then(() => {
      expect(menuActions.isMenuOpen()).toEqual(true);
      expect(menu1.isOpen()).toEqual(true);
      return menuActions.toggleMenu('menu1').then(() => {
        expect(menuActions.isMenuOpen()).toEqual(false);
        expect(menu1.isOpen()).toEqual(false);
        return menuActions.toggleMenu('menu1').then(() => {
          expect(menuActions.isMenuOpen()).toEqual(true);
        });
      });
    });
  });

  it('should not open non existing menu', () => {
    const { output: initOutput, instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu_not_existing').then(() => {
      expect(menuActions.isMenuOpen()).toEqual(false);
      const [ backdrop, options ] = renderPlaceholderChildren(instance);
      expect(backdrop).toBeFalsy();
      expect(options).toBeFalsy();
    });
  });

  it('should not open menu if not initialized', () => {
    const { instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      expect(menuActions.isMenuOpen()).toEqual(true);
      const [ backdrop, options ] = renderPlaceholderChildren(instance);
      // on layout has not been not called
      expect(backdrop).toBeFalsy();
      expect(options).toBeFalsy();
    });
  });

  it('should update options layout', () => {
    const { output: initOutput, instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      const [ , options ] = renderPlaceholderChildren(instance);
      expect(typeof options.props.onLayout).toEqual('function');
      options.props.onLayout({
        nativeEvent: {
          layout: {
            width: 22,
            height: 33,
          },
        },
      });
      expect(menuRegistry.getMenu('menu1')).toEqual(objectContaining({
        optionsLayout: {
          width: 22,
          isOutside: true,
          height: 33,
        },
      }));
    });
  });

  it('should render backdrop that will trigger onBackdropPress', () => {
    const { output: initOutput, instance } = renderProvider();
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      const [ backdrop ] = renderPlaceholderChildren(instance);
      expect(backdrop.type).toEqual(Backdrop);
      backdrop.props.onPress();
      expect(menu1.props.onBackdropPress).toHaveBeenCalled();
    });
  });

  it('should close the menu if backHandler prop is true and back button is pressed', () => {
    const { output: initOutput, instance } = renderProvider({backHandler: true});
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      instance._handleBackButton();
      return waitFor(() => !instance.isMenuOpen())
        .then(() => false)
        .catch(() => true)
        .then((isOpen) => expect(isOpen).toEqual(false), 1000);
    })
  });

  it('should not close the menu if backHandler prop is false and back button is pressed', () => {
    const { output: initOutput, instance } = renderProvider({backHandler: false});
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      instance._handleBackButton();
      expect(instance.isMenuOpen()).toEqual(true);
    })
  });

  it('should invoke custom handler if backHandler prop is a function and back button is pressed', () => {
    const handler = jest.fn().mockReturnValue(true);
    const { output: initOutput, instance } = renderProvider({backHandler: handler});
    const { menuRegistry, menuActions } = instance.getChildContext();
    initOutput.props.onLayout(defaultLayout);
    menuRegistry.subscribe(menu1);
    return menuActions.openMenu('menu1').then(() => {
      instance._handleBackButton();
      expect(handler.mock.calls).toHaveLength(1);
    })
  });

});