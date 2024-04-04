import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const FormContainer = styled.form`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  width: 24rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const Button = styled.button`
  background-color: #3b82f6;
  color: #fff;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #2563eb;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const Link = styled.a`
  font-weight: bold;
  font-size: 0.875rem;
  color: #3b82f6;
  transition: color 0.2s ease-in-out;
  margin-left: 0.5rem;
  &:hover {
    color: #2563eb;
  }
`;
