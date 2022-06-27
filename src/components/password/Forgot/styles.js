import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
`

const message = css`
  padding: .5rem .85rem;
  margin: 0 0 1.5rem 0; 
  background-color: #f4f4f4;
  min-height: 3rem;
  max-height: 7rem;
  box-sizing: border-box;
  border-radius: 1.15rem;
  border: 1px solid #dedede;
  color: #b9babc;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1rem;

  span {
    max-width: 85%;
    position: relative;
    max-height: calc(1rem * 3);
    overflow: hidden;
    padding-right: 1rem;
    text-overflow: ellipsis;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    min-height: 1.5rem;
    border-radius: 50%;
    padding: .25rem;
    box-sizing: border-box;
    margin: 0 0 0 1rem;
  }
`

export const ErrorMessage = styled.div`
  ${message}; 

  svg {
    background-color: #fd5b5d;
  }
`

export const SuccessMessage = styled.div`
  ${message}; 
   
  svg {
    background-color: #3abe71;
  }
`

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: start;
  flex: 1 0 100%;
  margin: 0 0 1.5rem 0;
`

export const FormField = styled.div`
  flex: 0 0 100%;
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 100%;
  margin: 2rem 0 0 0;

  button {
    flex: 0 0 calc(50% - .5rem);
    height: 3rem;
    background-color: ${ props => (props.theme && props.theme.main && props.theme.main.general 
        && props.theme.main.general.primaryColor) || '#000' };  
    cursor: pointer;

    &:hover {
      opacity: .9;
    }    

    &:disabled {
      opacity: .5;
      cursor: default;
    }

    &:first-of-type {
      margin: 0 1rem 0 0;
      background-color: transparent;
      border: 2px solid ${ props => (props.theme && props.theme.main && props.theme.main.general 
          && props.theme.main.general.primaryColor) || '#000' };
      color: ${ props => (props.theme && props.theme.main && props.theme.main.general 
          && props.theme.main.general.primaryColor) || '#000' };  

      &:hover {
        background-color: #f7f7f7;
      }    
    }
  }
`
