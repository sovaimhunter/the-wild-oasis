import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;
`;
// function FormRowVertical({ label, error, children }) {
//   return (
//     <StyledFormRowVertical>
//       {label && <Label htmlFor={children.props.id}>{label}</Label>}
//       {children}
//       {error && <Error>{error}</Error>}
//     </StyledFormRowVertical>
//   );
// }
function FormRowVertical({ label, error, children }) {
  // 安全获取 id：处理数组、单个元素或 undefined 的情况
  const getInputId = () => {
    if (!children) return undefined;
    if (Array.isArray(children)) {
      // 如果是数组，找到第一个有效的 React 元素
      const firstChild = children.find(
        (child) => child && typeof child === "object" && child.props?.id
      );
      return firstChild?.props?.id;
    }
    // 如果是单个元素，直接获取 id
    return children?.props?.id;
  };

  return (
    <StyledFormRowVertical>
      {label && <Label htmlFor={getInputId()}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
}
export default FormRowVertical;
