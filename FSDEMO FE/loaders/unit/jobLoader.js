import jobServices from "../../src/services/jobServices";

const jobLoader = async() => {
    try{
        const response = await jobServices.getJobs()

        return response.data;

    }catch(error){
        return null;
    }
}

export default jobLoader;