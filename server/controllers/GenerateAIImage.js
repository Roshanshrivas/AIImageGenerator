import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";


dotenv.config();

//Setup OpenAi Api
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//Controller to generate Image

export const generateImage = async (req, res, next) => {
    try{
        const { prompt } = req.body;
        console.log("Prompt received:", prompt);

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const generatedImage = response.data.data[0].b64_json;
        return res.status(200).json({
            photo: generatedImage,
        });

    } catch(error) {
        console.error("Error occurred:", error);
         return next(
            createError(
              error.status,
              error?.response?.data?.error.message || error.message
            )
          );
    }
}




















