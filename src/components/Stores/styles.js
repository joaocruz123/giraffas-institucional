import styled from 'styled-components'

export const Title = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.4rem;
`
export const Subtitle = styled.div`
    display: flex;
    flex-direction: column;
`
export const H1 = styled.h1`
    color: ${props => props.theme.colors.primary};
    margin: 0;
    font-size: 34px;
    font-weight: 300;
    text-transform: uppercase
`
export const H2 = styled.h2`
    color: ${props => props.theme.colors.primary};
    margin: 0;
    font-size: 13px;
    text-transform: uppercase
`

export const CustomIcon = styled.div`
    padding: 0 .6rem;
    line-height: 1.75;
`