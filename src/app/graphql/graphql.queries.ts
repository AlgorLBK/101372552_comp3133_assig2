import { gql } from "apollo-angular";

const GET_EMPLOYEES = gql`
    query GetAllEmployees {
        getAllEmployees {
            _id
            first_name
            last_name
            email
            gender
            salary
        }
    }
`

const DEL_EMPLOYEE = gql`
    mutation DeleteEmployee($employeeId: ID!) {
        deleteEmployee(_id: $employeeId)
    }
`;


const SEARCH_EMPLOYEE = gql`
    query SearchEmployeeById($searchKey: ID!) {
        searchEmployeeById(_id: $searchKey) {
            _id
            first_name
            last_name
            email
            gender
            salary
    }
}
`

const ADD_EMPLOYEE = gql`
    mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        addEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
            first_name
            last_name
            email
            gender
            salary
        }
    }
`

const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($id: ID!, $first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
        updateEmployee(_id: $id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
            _id
            first_name
            last_name
            email
            gender
            salary
        }
    }
`

const REGISTER_USER = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
        }
    }
`

const LOGIN = gql`
    query Login($usernameOrEmail: String!, $password: String!){
        login(usernameOrEmail:$usernameOrEmail, password:$password) {
            _id
            username
            email
            password
        }
    }
`

export {GET_EMPLOYEES, DEL_EMPLOYEE, SEARCH_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE, REGISTER_USER, LOGIN};