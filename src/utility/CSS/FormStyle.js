import styled from 'styled-components';

export const Form = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  
  color: rgb(97 97 97);
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
  width: 22rem;
  background-clip: border-box;
`;

export const Header = styled.div`
  position: relative;
  background-clip: border-box;
 
  
  margin: 10px;
  border-radius: 0.75rem;
  overflow: hidden;
  color: #fff;
  box-shadow: 0 0 #0000,0 0 #0000,0 0 #0000,0 0 #0000,rgba(33,150,243,.4);
  height: 4rem;
  letter-spacing: 0;
  line-height: 1.375;
  font-weight: 600;
  font-size: 1.9rem;
  font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Inputs = styled.div`
  padding: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
  width: 100%;
  height: 2.75rem;
  position: relative;
`;

export const Input = styled.input`
  border: 1px solid rgba(128, 128, 128, 0.61);
  outline: 0;
  color: rgb(69 90 100);
  font-weight: 400;
  font-size: .9rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  background-color: transparent;
  border-radius: .375rem;
  width: 100%;
  height: 100%;

  &:focus {
    border: 1px solid #1e88e5;
  }
`;

export const Checkbox_Container = styled.div`
  margin-left: -0.625rem;
  display: inline-flex;
  align-items: center;
`;

export const Input_Checkbox = styled.label`
  position: relative;
  overflow: hidden;
  padding: .55rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.027);
  height: 35px;
  width: 35px;

  input {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CheckboxText = styled.label`
  cursor: pointer;
`;

export const Sign_in_Btn = styled.button`
 text-transform: uppercase;
  font-weight: 700;
  font-size: .75rem;
  line-height: 1rem;
  text-align: center;
  padding: .75rem 1.5rem;

  border-radius: .5rem;
  width: 100%;
  outline: 0;
  border: 0;
  color: #fff;
  `;