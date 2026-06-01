// <Reveal> — render visible by default. The fade-up animation is opt-in via
// CSS class because setTimeout-based animation is unreliable in hidden tabs
// and IntersectionObserver was flaky in this iframe context. Content is
// always present.

function Reveal({ children, delay = 0, y = 14, as: As = "div", style, className = "", ...rest }) {
  return (
    <As className={className} style={style} {...rest}>
      {children}
    </As>
  );
}

Object.assign(window, { Reveal });
