import styled from 'styled-components';

export const Search__Input = styled.input`
  margin: 5px 15px !important;
`;

export const Holiday_submit = styled.button`
 font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
 font-size: 16px;
 font-weight: 400;
 height: 45px;
 width: 235px;
 border: 0px solid;
 background-image: linear-gradient(45deg,blue,#00f0a0,blue);
 background-size: 500% 400%;
 color: white;
 border-radius: 50px;
 transition: 0.6s all;
     &:hover{
        background-position: 75% 50%;
 transform: perspective(100px)
     }
     &:active{
        transform: scale(0.95);
        transition: 0.1s;
     }
`