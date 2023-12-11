class UserDto {
    constructor(user) {
      const { _id, first_name, last_name, email, age, role } = user;
      this.id = _id;
      this.firstName = first_name;
      this.lastName = last_name;
      this.email = email;
      this.age = age;
      this.role = role;
    }
  }
  
  export default UserDto;
  