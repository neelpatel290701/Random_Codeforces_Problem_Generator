
mainframe = document.getElementById("mainframe").innerHTML;

function gen(){

    // console.log("NEEL")
    var user_name = document.getElementById("username").value
    console.log(user_name)
    if(user_name == "") {
        return
    }

    var rating = document.getElementById("rating").value
    console.log(rating)

    // document.getElementById("extra").innerHTML = "NEEL" ;

    var url = "https://codeforces.com/api/problemset.problems" ;
    var url_user_status = "https://codeforces.com/api/user.status?handle="
    url_user_status += user_name
    url_user_status += "&from=1"

    var p = fetch(url) ;
    var p1 = fetch(url_user_status)

    var questions = []
    var user_questions = []
    var user_don_questions = []

    var mp = new Map()

    p.then( (response) =>{

        if (!response.ok) {
            return Promise.reject("Sorry");
        }
            console.log(response.status)
            console.log(response.ok)
            return response.json()

    }).then( (data)=>{

            // console.log(data)


            for(let i=0 ; i<data.result.problems.length ; i++){
                    if(data.result.problems[i].rating == rating){
                            questions.push(data.result.problems[i])
                    }
            }
            console.log(questions.length)
            // for(let i=0 ; i <questions.length ; i++){
            //         console.log(questions[i].points)
            // }

                    p1.then( (response)=>{

                        if (!response.ok) {
                            return Promise.reject("Sorry");
                        }
                            // console.log(response.status)
                            // console.log(response.ok)
                            return response.json()

                    }).then( (data)=>{

                            for(let i=0 ; i<data.result.length ; i++){
                                    if(data.result[i].problem.rating == rating && data.result[i].verdict == "OK"){
                                        user_questions.push(data.result[i].problem)
                                        let x = data.result[i].problem.contestId
                                        mp.set(x, data.result[i].problem.index)
                                    }
                            }

                            // console.log(mp.size)


                            
                            for(let i = 0 ; i < questions.length ; i++){

                                    if(!mp.has(questions[i].contestId)){
                                            user_don_questions.push(questions[i])
                                    }
                            }

                            console.log(user_don_questions.length)

                                if(user_don_questions.length > 0){
                                let x = Math.floor(Math.random() * user_don_questions.length) ;

                                console.log(user_don_questions[x])
                                console.log(x)


                                let prob_url = "https://codeforces.com/problemset/problem/";
                                prob_url += user_don_questions[x].contestId;
                                prob_url += "/";
                                prob_url += user_don_questions[x].index;



                                console.log(prob_url)


                                // let frame = ` <div>

                                //                  <a href="${prob_url}">Click Here</a>
                                // </div>`;
                                // document.getElementById("mainframe").innerHTML = mainframe + frame
                                // <p class="mb-3 font-normal">Problem ${good[a].index} : ${good[a].name}</p>


                        let frame = ` 
                                <div class="mt-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="background-color: white; color: black" >
                                <a href="${prob_url}" style="color: red; text-decoration: none;">Problem Link</a>
                                </div>`;
                                console.log(frame)
                                document.getElementById("mainframe").innerHTML = mainframe + frame;
                        } 
                        else{

                                let frame = ` 
                                <div class="mt-8 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style="background-color: black; color: white">
                                <p class="mb-3 font-normal ">Not found any problem</p>
                                <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
                                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                                </a>
                                </div>`
                                document.getElementById("mainframe").innerHTML = mainframe + frame
                    }


                    })

    })
     
}