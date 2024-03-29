import React, { useEffect } from "react";
import {useState, useRef, useReducer} from "react";
import './Blog.css';

function blogsReducer(state, action){
    switch(action.type){
        case "ADD":
            return [action.blog, ...state]
        case "DELETE":
            return state.filter((blog, index) => index !== action.index)
        default:
            return []
    }
}

export default function Blog (){
    // const [title, setTitle] = useState("")
    // const [content, setContect] = useState("")
    const [formData , setformData] = useState({title: "", content: ""})
    // const [blogs, setBlog] = useState([]);
    const [blogs , dispatch] = useReducer(blogsReducer , [])
    const TitleRef = useRef(null);


    useEffect(()=> {
        TitleRef.current.focus();
    },[blogs])

    useEffect(()=> {
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title
        }else{
            document.title = "No blogs!!"
        }
    }, [blogs])
    function handleSubmit(e){
        e.preventDefault();

        // setBlog([{title: formData.title,content: formData.content}, ...blogs]);
        dispatch({type:"ADD" , blog:{title: formData.title,content: formData.content}})
        setformData({title: "" , content: ""})
        
        console.log(blogs);
    }
    function deleteBlog(i){
        // setBlog(blogs.filter((blog, index) => i!==index))
        dispatch({type: "DELETE" , index: i})
        
    }
    
    return(
        <>
            <div className="Blog">
                <form onSubmit={handleSubmit}>
                        <h4>Title</h4>
                        <input  className="Input"
                            placeholder="Enter Your Titile Here..."
                            value={formData.title}
                            ref={TitleRef}
                            onChange={(e) => setformData({title: e.target.value, content: formData.content})}

                        />
                        <h4>Content</h4>
                        <textarea   className="Content"
                                placeholder="Content Goes here....."
                                value={formData.content}
                                required
                                onChange={(e) => setformData({title:formData.title , content: e.target.value})}

                        /> 
                    

                    <button className="btn1" >ADD BLOG</button>

                </form>
            </div>
            <hr />
            <h2> Blogs </h2>
                {blogs.map((blog,i) => (
                    <div className="blog">
                        <h3>{blog.title}</h3>
                        <hr/>
                        <p>{blog.content}</p>
                        <div className="blog-btn">
                            <button className="btn remove" onClick={() => deleteBlog(i)}>DELETE</button>
                        </div>
                    </div>
        ))}
        </>
    )
} 
