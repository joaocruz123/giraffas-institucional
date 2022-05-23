import styled from 'styled-components'
import Background from './../../assets/background_footer.png'

export const Wrapper = styled.div`
    background-image: url(${Background});
    background-color: ${props => props.theme.colors.footerBackground};
    padding: 2rem;
`
export const Title = styled.div`
    font-size: 42px;    
    text-transform: uppercase;
    color: ${props => props.theme.colors.white};
`
export const SubTitle = styled.div`
    font-size: 14px;    
    color: ${props => props.theme.colors.white};
    font-weight: bold;
`
export const Session = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`
export const TitleTwo = styled.div`
    font-size: 32px;    
    color: ${props => props.theme.colors.white};
    text-align: end;
    font-weight: 200;
`
export const SubTitleTwo = styled.div`
    font-size: 18px;    
    color: ${props => props.theme.colors.white};
    font-weight: 300;
    text-align: end;
`
export const SessionTwo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    padding: .8rem 0 0 0;
`