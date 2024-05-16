import OutcomeModel from "./OutcomeModel";
import RawOutcomeModel from "./RawOutcomeModel";

interface ClassModel {
    Name: string,
    Exercise?: File,
    Submission?: File,
    Semester?: string,
    Default: boolean,
    Outcomes: OutcomeModel[],
    RawOutcomes: RawOutcomeModel[]
}

export default ClassModel;