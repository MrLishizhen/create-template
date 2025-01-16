interface TreeNode {
  id: number;
  parentId: number;
  link?: React.Key;
  children?: TreeNode[];
}

//生成树状数据
export const generateTree = <T extends TreeNode, R>({
  data,
  parentId = 0,
  customizer,
}: {
  data: T[];
  parentId?: number;
  customizer?: (node: T) => R;
}): R[] => {
  return data
    .filter(item => item.parentId === parentId)
    .map(item => {
      const children = generateTree({ data, parentId: item.id, customizer });
      const result = {
        key: item.link,
        ...customizer?.(item),
        ...(children.length > 0 ? { children } : {}),
      };
      return result;
    }) as R[];
};
