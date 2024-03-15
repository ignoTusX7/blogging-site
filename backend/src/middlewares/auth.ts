import { Context, Next } from "hono";

export const auth = async(c: Context, next: Next)=>{
    // console.log(c);
    next();
}