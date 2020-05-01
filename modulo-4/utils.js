module.exports = {
    age: (timeStamp) => {
        const today = new Date();
        const birthDate = new Date(timeStamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        let todayIsMinorBirthday = today.getDate() < birthDate.getDate();

        if (month <= 0 && today.getDate && todayIsMinorBirthday) age = age -1;

        return age;
    }
}