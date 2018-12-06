export { pathStyle } from './path.style';

export const applyStyle = (ctx: any) => (style: {[key: string]: string | number}) => {
  Object.keys(style)
    .forEach(key => ctx[key] = style[key]);
};