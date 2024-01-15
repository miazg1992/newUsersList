import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { Wrapper } from './Root.styles';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import AddUser from 'views/AddUser';
import Dashboard from 'views/Dashboard';
import UsersProvider from 'providers/UsersProvider';

const Root = () => {
  const [users, setUsers] = useState(usersData);

  const handleAddUser = (values) => {
    const newUser = {
      name: values.name,
      attendance: values.attendance,
      average: values.average,
    };
    setUsers([newUser, ...users]);
  };

  const deleteUser = (name) => {
    const filteredUsers = users.filter((user) => user.name !== name);
    setUsers(filteredUsers);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainTemplate>
          <UsersContext.Provider
            value={{
              users,
              handleAddUser,
              deleteUser,
            }}
          >
          <UsersProvider>
            <Wrapper>
              <Routes>
                <Route path="/add-user" element={<AddUser />}></Route>
                <Route path="/" element={<Dashboard />}></Route>
              </Routes>
            </Wrapper>
          </UsersProvider>
        </MainTemplate>
      </ThemeProvider>
    </Router>
  );
};

export default Root;
