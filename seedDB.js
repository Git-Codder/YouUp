var mongoose = require('mongoose'),
    Tags = require("./module/tag"),
    Posts = require("./module/post"),
    Users = require("./module/user");

var tags_data =
[
    {
        name:"Tech",
        image:"https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name:"Education",
        image:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    
    },
    {
        name:"Art",
        image:"https://images.unsplash.com/photo-1526304760382-3591d3840148?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        
    },
    {
        name:"Sports",
        image:"https://images.unsplash.com/photo-1541983663620-7571a820610c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    
    },
    {
        name:"Food",
        image:"https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        
    },
    {
        name:"Science",
        image:"https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        
    },
    {
        name:"Business",
        image:"https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

    }
   
]

var post_data = [
    {
        name        : "first post_1",
        image       : "https://images.unsplash.com/photo-1592080316965-31d9d2f45762?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    }
    // {
    //     name        : "first post_2",
    //     image       : "https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    // }
    // {
    //     name        : "four post_1",
    //     image       : "https://images.unsplash.com/photo-1532040683343-edbde6dd500d?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60",
    //     description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    // },
    // {
    //     name          : "four post_2",
    //     image       : "https://images.unsplash.com/photo-1568918460973-fe7f54f82482?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60",
    //     description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    // },
    // {
    //     name        : "third post_1",
    //     image       : "https://images.unsplash.com/photo-1580339475952-d3ced325ad90?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60",
    //     description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    // },
    // {
    //     name        : "third post_2",
    //     image       : "https://images.unsplash.com/photo-1552609034-ae1a64c72b5e?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60",
    //     description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley"
    // }

]


var users_data = [
    {
        user_name   : "a_234",
        name        : "Adityasdf",
        image       : "https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        place       : "New York",
        field       : "Technical",
    },
    {
        user_name   : "a_23432",
        name        : "Adityabgh",
        image       : "https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        place       : "New York",
        field       : "Technical",
    },
    {
        user_name   : "a_2345we",
        name        : "Adityawerte",
        image       : "https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        place       : "New York",
        field       : "Technical",
    },
    {
        user_name   : "a_2342345",
        name        : "Adityavnb",
        image       : "https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        place       : "New York",
        field       : "Technical",
    }
]

//creating new tag with the help of our database and in each tag creating new post using post_data
function seedDB(){

    Tags.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Tag removed");
        }
    });

    Users.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("User removed");
        }
    });

    Posts.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Post removed");
            
        }
    });

    
    

    tags_data.forEach(function(seed){
        Tags.create(seed,function(err,tag){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("New tag added..!");
                post_data.forEach(function(post_seed){
                    Posts.create(post_seed,function(err,post_data){
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            console.log("New Post added..!");
                            tag.post.push(post_data);
                            tag.save();
                            // tag.save(function(err,saved_data){
                            //     if(err)
                            //     {
                            //         console.log(err);
                            //     }
                            //     else
                            //     {
                            //         console.log("work Done..!");
                            //     }
                            // });
                        }
                    });
                });
            }
        });
    });

    users_data.forEach(function(seed){
        Users.create(seed,function(err,user){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("New user added..!");
                post_data.forEach(function(post_seed){
                    Posts.create(post_seed,function(err,post_data){
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            console.log("New Post added..!");
                            user.post.push(post_data);
                            user.save();
                            
                        }
                    });
                });
            }
        });
    });
};



//exporting seedDB function use this in another file 

module.exports = seedDB;