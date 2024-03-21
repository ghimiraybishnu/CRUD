import InputForm from "./InputForm";
import './UserDetail.css';

function UserEdit({ user, updateUser }) {
    const handleUpdate = (formData) => {
        // Any pre-processing or validation can go here
        updateUser(formData);
    };

    return (
        <div>
            <h2>Edit User</h2>
            <InputForm initialData={user} updateUser={handleUpdate} />
        </div>
    );
}
  export default UserEdit;
  