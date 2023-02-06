import styled from 'styled-components';

export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 2rem auto;

  h2 {
    margin-bottom: 1rem;
  }

  button, input {
    height: 35px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;

    &:focus{
      border: 1px solid rgb(128, 113, 83);;
    }
  }

  button{
    cursor: pointer;
    background: rgb(128, 113, 83);
    color: white;

    &:focus{
      border: none;
    }
  }

  p {
    font-size: 14px;
    color: red;
  }
`;

export const StyledFormUserUpdate = styled.form`
  max-width: 350px;
  width: 100%;
  margin-top: 2rem;

  h3 {
    margin-bottom: 1rem;
    text-align: left;
  }

  button, input {
    height: 35px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;

    &:focus{
      border: 1px solid rgb(128, 113, 83);;
    }
  }

  button{
    cursor: pointer;
    background: rgb(128, 113, 83);
    color: white;

    &:focus{
      border: none;
    }
  }

  p {
    font-size: 14px;
    color: red;
  }
`;