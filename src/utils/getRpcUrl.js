// Array of available nodes to connect to
export const nodes = [process.env.NEXT_PUBLIC_NETWORK_URL]

const getNodeUrl = () => {
  // const randomIndex = random(0, nodes.length - 1)
  return nodes[0]
}

export default getNodeUrl
