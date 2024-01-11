import styled from 'styled-components';

export const LoginButton = styled.button
`
--clr-font-main: hsla(0 0% 20% / 100);
--btn-bg-1: hsla(194 100% 69% / 1);
--btn-bg-2: hsla(217 100% 56% / 1);
--btn-bg-color: hsla(360 100% 100% / 1);
--radii: 0.5em;
cursor: pointer;
display:'flex';
padding:5px 5px;
min-width: 120px;
height:'50px';
font-size: var(--size, 1rem);
font-family: "Segoe UI", system-ui, sans-serif;
font-weight: 500;
transition: 0.8s;
background-size: 280% auto;

border: none;
border-radius: var(--radii);
color: var(--btn-bg-color);
background-color:#d90429;
    background-position: right top;
 }
 & :is(:focus, :focus-within,:active) {
    outline: none;
    box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
  }
  
`
  
export const HolidayButton = styled.button
`
--clr-font-main: hsla(0 0% 20% / 100);
--btn-bg-1: hsla(194 100% 69% / 1);
--btn-bg-2: hsla(217 100% 56% / 1);
--btn-bg-color: hsla(360 100% 100% / 1);
--radii: 0.5em;
cursor: pointer;
display:'flex';
padding: 5px 1em;
min-width: 120px;
height:'60px';
font-size: var(--size, 1rem);
font-family: "Segoe UI", system-ui, sans-serif;
font-weight: 500;
transition: 0.8s;
background-size: 280% auto;
background-image: linear-gradient(325deg, var(--btn-bg-2) 0%, var(--btn-bg-1) 55%, var(--btn-bg-2) 90%);
border: none;
border-radius: var(--radii);
color: var(--btn-bg-color);

&:hover{
    background-position: right top;
 }
 & :is(:focus, :focus-within,:active) {
    outline: none;
    box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
  }
  &:disabled {
   
    cursor: not-allowed;
    /* Add any other styles you want for the disabled state */
  }
  
`

  
//   .btn-donate:is(:focus, :focus-within,:active) {
//     outline: none;
//     box-shadow: 0 0 0 3px var(--btn-bg-color), 0 0 0 6px var(--btn-bg-2);
//   }
  
//   @media (prefers-reduced-motion: reduce) {
//     .btn-donate {
//       transition: linear;
//     }
//   }
  