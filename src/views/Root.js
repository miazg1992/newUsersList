import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { Wrapper } from './Root.styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { users as usersData } from 'data/users';
import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import AddUser from 'views/AddUser';
import Dashboard from 'views/Dashboard';

export const UsersContext = React.createContext({
  users: [],
  handleAddUser: () => {},
  deleteUser: () => {},
});

const Root = () => {
  const [users, setUsers] = useState(usersData);

  const handleAddUser = (values) => {
    console.log('dodawanie w root ' + values);
    const newUser = {
      name: values.name,
      attendance: values.attendance,
      average: values.average,
    };
    setUsers([newUser, ...users]);
    console.log(users);
  };

  const deleteUser = (name) => {
    console.log('usunąć' + name);
    const filteredUsers = users.filter((user) => user.name !== name);
    setUsers(filteredUsers);
    console.log(users);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainTemplate>
          <UsersContext.Provider
            value={{
              users: usersData,
              handleAddUser,
              deleteUser,
            }}
          >
            <Wrapper>
              <Routes>
                <Route path="/add-user" element={<AddUser />}></Route>
                <Route path="/" element={<Dashboard />}></Route>
              </Routes>
            </Wrapper>
          </UsersContext.Provider>
        </MainTemplate>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
