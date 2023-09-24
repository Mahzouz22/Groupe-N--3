//pagination function
function pagination(nbrPag, curPag){
    
    var listOfPages = "";
    
    if(nbrPag > 1){

        curPag = parseInt(curPag);

        listOfPages += `<ul class="pagination justify-content-center">`;
        
        const previous = curPag == 1 ? "disabled" : "";
        listOfPages += `<li class="page-item ${previous}"><a class="page-link" data-page="${curPag-1}">Previous</a></li>`;

        for(let p=1; p<=nbrPag; p++){

            const active = curPag == p ? "active" : "";

            listOfPages += `<li class="page-item ${active}"><a class="page-link" data-page="${p}">${p}</a></li>`;

        }

        const next = curPag == nbrPag ? "disabled" : "";
        listOfPages += `<li class="page-item ${next}"><a class="page-link" data-page="${curPag+1}">Next</a></li>`;

        listOfPages += `</ul>`;
    }
    $('#pagination').html(listOfPages);
}

//get users from database
function getuserrow(user){

    var userRow = "";
    
    if(user){

        userRow = `<tr>
                        <th scope="row">${user.id}</th>
                        <td><img src=uploads/${user.image} alt="pic" class="img-responsive img-thumbnail" width="40px" height="40px"></td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.mobile}</td>
                        <td>
                            <button class="btn profile" data-bs-target="#profileModal" data-bs-toggle="modal" title="View Profile" data-id=${user.id}>
                                <i class="fa-solid fa-eye text-success"></i>
                            </button>
                            <button class="btn edit" title="Edit" data-bs-target="#userModal" data-bs-toggle="modal" data-id=${user.id}>
                                <i class="fa-solid fa-edit text-info"></i>
                            </button>
                            <button class="btn delete" title="Delete" data-id=${user.id}>
                                <i class="fa-solid fa-trash-alt text-danger"></i>
                            </button>
                        </td>
                    </tr>`;
    }
    return userRow;
}

//function to get user
    function getusers() {

        var pageNumber = $('#currentpage').val();
         
        $.ajax({

            url: '/ajax.php',

            method: "GET",

            dataType: 'json',

            data: {page:pageNumber,action:'getAllUsers'},

            beforeSend: function(){

                console.log("Fetching table...")
            },

            success:function(rows){
                
                console.log(rows);

                if(rows.users){
                    var userslist = "";

                    $.each(rows.users, function(index, user){
                        userslist += getuserrow(user);
                    });

                    $('#usertable tbody').html(userslist);

                    let totalusers = rows.count;
                    let totalpages = Math.ceil(parseInt(totalusers)/5);
                    const currentpage = $('#currentpage').val();

                    pagination(totalpages,currentpage);
                }
            },

            error: function(request,error){

                console.log(arguments);
                console.log("Error " + error);
            }
        });
};

$(document).ready(function(){
    
    //adding users
    $(document).on('submit', '#userform', function(e){

        e.preventDefault();

        $.ajax({

            url:'/ajax.php',

            method: "POST",

            dataType: 'json',

            data: new FormData(this),

            processData: false,

            contentType: false,

            beforeSend: function(){

                console.log("Loading...")
            },

            success:function(response){
                console.log(response);

                if(response){
                    $('.message').html("User added successfully").fadeIn().delay(2000).fadeOut();
                    $("#userModal").modal("hide");
                    $("#userform")[0].reset();
                    getusers();
                }
            },

            error: function(request,error){

                console.log(arguments);
                console.log("Error " + error);
            }

        });

    });

    //onclick event for pagination
    $(document).on('click', 'ul.pagination li a', function(event){

        event.preventDefault();

        const clickedNumber=$(this).data("page");

        $('#currentpage').val(clickedNumber);
        getusers();
        // $(this).parent().siblings().removeClass("active");
        // $(this).parent().addClass("active");
    });


    //onclick event for editing
    $(document).on('click', 'button.edit', function(){
        var dataId = $(this).data('id');
        $.ajax({

            url: '/ajax.php',

            method: "GET",

            dataType: 'json',

            data: {id:dataId,action:'editData'},

            beforeSend: function(){

                console.log("Fetching row...")
            },

            success:function(row,status){
                
                console.log(row,status);

                if(row){
                    $('#username').val(row.name);
                    $('#useremail').val(row.email);
                    $('#usertel').val(row.mobile);
                    $('#userId').val(row.id);
                }

            },

            error: function(request,error){

                console.log(request);
                console.log(arguments);
                console.log("Error " + error);
            }
        });
    })

    $('#AddNewUserButton').on('click', function(){
        // alert(1);
        $("#userform")[0].reset();
        $('#userId').val('');
    })

    $(document).on('click', 'button.delete', function(e){
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm("You will be deleting this record")){
            $.ajax({

                url: '/ajax.php',
    
                method: "GET",
    
                dataType: 'json',
    
                data: {id:id,action:'deleteData'},
    
                beforeSend: function(){
    
                    console.log("Please wait...")
                    
                },
                success:function(row){
                    if(row.deleted==1){
                        $('.message').html("User deleted successfully").fadeIn().delay(2000).fadeOut();
                        getusers();
                        console.log('done');
                    }
                },
                error: function(request,error){

                    console.log(arguments);
                    console.log("Error " + error);
                }
            });
        }

    });
    

    $(document).on('click', 'button.profile', function() {
        var dataId = $(this).data('id');

        $.ajax({

            url: '/ajax.php',

            method: "GET",

            dataType: 'json',

            data: {id:dataId,action:'editData'},

            beforeSend:function () {
                console.log('Profile of user Id = '+ dataId);
            },

            success:function(user){
                if(user){
                    const profile = `
                                        <div class="row">
                                        
                                            <div class="col-sm-6 col-md-4">
                                        
                                                <img src="uploads/${user.image}" alt="pic" class="img-responsive img-thumbnail">
                                        
                                            </div>
                                        
                                            <div class="col-sm-6 col-md-8">
                                        
                                                <h4 class="text-primary">${user.name}</h4>
                                        
                                                <p>
                                                    <i class="fa-solid fa-inbox fa-bounce mb-1"></i>&nbsp;${user.email}
                                                    <br>
                                                    <i class="fa-solid fa-phone fa-bounce"></i>&nbsp;${user.mobile}
                                                </p>
                                        
                                            </div>
                                        
                                        </div>
                                        `;
                    $('#profile').html(profile);
                }
            },
            error:function(error){
                console.log(error)
            }
        });
    });
    getusers();

});