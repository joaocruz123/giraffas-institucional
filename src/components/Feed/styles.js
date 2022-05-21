import styled from 'styled-components'

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >p {
        font-size: 13px;
        margin: .6rem 0 0 0;
        color: ${props => props.theme.colors.secondary};
    }
`