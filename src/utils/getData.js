export const getMoreListData = (length = 10) => {
  return Array.from({ length }).map((_, index) => ({
    key: index + 1,
    name: `胡彦斌${index + 1}`,
    age: Math.floor(Math.random() * 100),
    address: `西湖区湖底公园${Math.floor(Math.random() * 100)}号`,
  }))
}
