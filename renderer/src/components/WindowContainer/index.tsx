import { Box, Flex, Text, Image } from '@chakra-ui/react'

import { WindowContainerProps } from './types'

export const WindowContainer = (props: WindowContainerProps) => {
  const { children } = props
  return (
    <Box
      w="100vw"
      h="100vh"
      bg="gray.900"
      borderRadius="8"
      overflow="hidden"
      __css={{
        WebkitUserSelect: 'none',
        WebkitAppRegion: 'drag',
      }}
    >
      <Flex align="center" justify="space-between" h="4vh" boxShadow="dark-lg">
        <Image src="icon.ico" ml="2" w="8" h="8" mr="16" />
        <Text fontSize={18}>AppPreset - PathFinder</Text>
        <Flex
          __css={{
            WebkitAppRegion: 'no-drag',
          }}
          ml="8"
          w="16"
          mr="2"
        />
      </Flex>
      <Flex h="96vh">
        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="center"
          p="4"
          bg="gray.800"
          __css={{
            WebkitAppRegion: 'no-drag',
          }}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}
