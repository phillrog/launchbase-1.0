module.exports = {
    age: (timeStamp) => {
        const today = new Date();
        const birthDate = new Date(timeStamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        let todayIsMinorBirthday = today.getDate() < birthDate.getDate();

        if (month <= 0 && today.getDate && todayIsMinorBirthday) age = age -1;

        return age;
    },
    date: (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        };
    },
    typeBlood: (blood) => {
        const types = {  
            "A1" : "A+",
            "A0" : "A-",
            "B1" : "B+",
            "B0" : "B-",
            "AB1":"AB+",
            "AB0": "AB-",
            "O1" : "O+",
            "O0" : "O-"
        };

        return types[blood]
    }
}