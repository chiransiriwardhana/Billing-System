pool.query(query, values, (err, results) => {
    if (err) throw err
    if (results.rows[0] == undefined) {
        console.log("results.rows[0]")
        console.log(results.rows[0])
        var query = 'INSERT INTO role (role_name,username,password) VALUES ($1,$2,$3)'
        var values = [role_name, str_list[0], str_list[1]]
        console.log("values")
        console.log(values)
        pool.query(query, values, (err, results) => {
            if (err) throw err
            console.log("insert data to database successfully")

        })


    }
    else{
        console.log("username and password exist")
    }


})
