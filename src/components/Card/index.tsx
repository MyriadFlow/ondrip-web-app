import { Flex, Text, Button, Image, Spacer, Center } from '@chakra-ui/react'

import './index.css';

type CardProps = {
  isUser?: boolean;
}

function Card({ isUser }: CardProps) {
  return (
    <Flex className='card'>
      <Flex className='card-header' justifyContent='space-between'>
        <Button
          className='price'
          size='xs'
          borderRadius={25}
          color='white'
          backgroundColor='#E50914'
        >
          2 MATIC
        </Button>
        <Button
          className='status'
          size='xs'
          borderRadius={25}
          border='1px solid #227514'
          color='#227514'
          backgroundColor='white'
        >
          Verified
        </Button>
      </Flex>

      <Flex className='card-body' flexDirection='column' py={5}>
        <Text color='#797979'>View owner guidelines</Text>

        <Image src='/netflix.png' height='56px' />
      </Flex>

      <Flex className='card-footer' justifyContent='space-between'>
        {isUser ?
          (
            <>
              <Button
                className='action'
                size='sm'
                borderRadius={25}
                color='white'
                backgroundColor='#266011'
              >
                Top Up
              </Button>

              <Spacer />

              <Button
                className='action'
                size='sm'
                borderRadius={25}
                color='white'
                backgroundColor='#266011'
              >
                Transfer
              </Button>
            </>
          )
          : (
            <Flex justifyContent='center' width='100%'>
              <Button
                className='action'
                size='sm'
                borderRadius={25}
                color='white'
                backgroundColor='#266011'
                width='90%'
              >
                Buy
              </Button>
            </Flex>

          )}

      </Flex>
    </Flex>
  );
}

export default Card;
