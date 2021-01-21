import React from 'react'
import Link from 'next/link'
import { useCurrentUser } from '@cms'
import styled from 'styled-components'
import Container from '@heydays/Container'

const AdminBar = () => {
  const user = useCurrentUser()
  return (
    <StyledAdminBar>
      <Container>
        <strong>Preview mode</strong>
        <span>
          The content you see might not reflect the published website.
        </span>
        {user && (
          <span>
            Logged in as <strong>{user?.data?.name}</strong>
          </span>
        )}
        <Link href="/api/exit-preview">
          <a>Leave preview mode</a>
        </Link>
      </Container>
    </StyledAdminBar>
  )
}

const StyledAdminBar = styled.div`
  padding: 5px;
  background-color: silver;
  font-family: sans-serif;
`

export default AdminBar
