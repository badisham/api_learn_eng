const sql = require('./db.js');

const Member = function (member) {
    this.username = member.username;
    this.password = member.password;
    this.firstname = member.firstname;
    this.lastname = member.lastname;
    this.sex = member.sex;
    this.age = member.age;
    this.email = member.email;
    this.phone = member.phone;
    this.level_ID = member.level_ID;
    this.role = member.role;
    this.national_ID = member.national_ID;
    this.bank_account_num = member.bank_account_num;
};

Member.create = (newMember, result) => {
    sql.query('INSERT INTO member SET ?', newMember, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created member: ', { id: res.insertId, ...newMember });
        result(null, { id: res.insertId, ...newMember });
    });
};

Member.findById = (MemberId, result) => {
    sql.query(`SELECT * FROM member WHERE id = ${MemberId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found member: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found Member with the id
        result({ kind: 'not_found' }, null);
    });
};

Member.getAll = (result) => {
    sql.query('SELECT id,firstname,lastname FROM member', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('Members: ', res);
        result(null, res);
    });
};

Member.updateById = (id, member, result) => {
    sql.query(
        'UPDATE member SET firstname = ?,lastname = ?,sex = ?,age = ?,email = ?,phone = ?,national_ID = ?,bank_account_num = ? WHERE id = ?',
        [
            member.firstname,
            member.lastname,
            member.sex,
            member.age,
            member.email,
            member.phone,
            member.national_ID,
            member.bank_account_num,
            id,
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Member with the id
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('updated member: ', { id: id, ...member });
            result(null, { id: id, ...member });
        },
    );
};

Member.remove = (id, result) => {
    sql.query('DELETE FROM member WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Member with the id
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted Member with id: ', id);
        result(null, res);
    });
};

Member.removeAll = (result) => {
    sql.query('DELETE FROM Members', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Members`);
        result(null, res);
    });
};

module.exports = Member;
