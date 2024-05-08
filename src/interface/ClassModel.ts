import LabModel from "./LabModel";

interface ClassModel {
    Name: string,
    Exercise?: File,
    Submission?: File,
    Semester?: string,
    Default: boolean,
    Labs: LabModel[] 
}

export default ClassModel;