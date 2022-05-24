import styled from 'styled-components'

export const CategorieName = styled.div`
    font-size: 2.6rem;    
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
`
export const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;
    padding: 0 0 2rem 0;
`
export const ProductName = styled.div`
    font-size: 18px;    
    color: ${props => props.theme.colors.primary};
    text-align: center;
    font-weight: 400;
    bottom: 0;
`