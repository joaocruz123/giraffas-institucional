import styled from 'styled-components'

export const SessionTitle = styled.h1`
	font-size: 3rem;
	width: 100%;
	text-align: center;
	color: ${props => props.theme.colors.primary};
`

export const CategorieName = styled.div`
    font-size: 2rem;    
    color: ${props => props.theme.colors.primary};
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`
export const Product = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
    height: 100%;

    > img {
        transform: scale(1.1);
        margin: .6rem 0; 
        transition: transform .2s;

        :hover {
            transform: scale(1.2); 
        }
    }
`
export const ProductName = styled.p`
    font-size: 17px;    
    color: ${props => props.theme.colors.primary};
    text-align: center;
    font-weight: 500;
    padding: 0;
    margin: 0;
`
export const WrapperModal = styled.div`
    padding: 1rem 2rem;

    >h1 {
        color: ${props => props.theme.colors.primary};
        font-size: 18px;
        font-weight: 400;
        text-align: center;
    }
`
export const WrapperImg = styled.div`
		min-height: 11rem;
		max-height: 11rem;

		> img {
			width: 100%;
			transform: scale(1.4);
			margin-top: -40px;
		}
`

export const Img = styled.img``

export const H1 = styled.h1``

export const Description = styled.p`
    padding: 0;
    margin: 0;
    color: ${props => props.theme.colors.textPrimary};
    text-align: center;
    font-size: 14px;
		margin-bottom: 1rem;
`
export const Header = styled.div`
		font-size: 14px;
		font-weight: bold;
		text-align: center;
		color: ${props => props.theme.colors.textPrimary};
		width: 100%;
`
export const Body = styled.div`
		font-size: 14px;
		text-align: center;
		color: ${props => props.theme.colors.textPrimary};
		width: 100%;
`
export const CustomButton = styled.button`
    color: #fff;
    padding: 10px 16px;
    border-radius: 4px;
    font-weight: 100;
    outline: 0;
    border: 0;
    margin: 1rem 0 0 0;
		text-align: center;
    font-size: 0.875rem;
    line-height: 2;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    min-width: 64px;
		width: 100%;
    background-color: ${props => props.theme.colors.primary};
`
