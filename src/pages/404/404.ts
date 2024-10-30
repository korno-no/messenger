import { BlockProps } from "../../core/block";
import { CoverScreen} from "../../components"
import Block from "../../core/block"
import backgroundImg from '../../assets/images/background.jpg'


interface IErrorFixingPageProps extends BlockProps  {}

export default class ErrorFixingPagePage extends Block <IErrorFixingPageProps>{
    constructor(props: IErrorFixingPageProps) {
        super({
            ...props,
            title: "ErrorFixingPage Page"
        })
        
    }
    init(){
        const ErrorScreen = new CoverScreen({ code: 404, background: backgroundImg,
            text:"Oops, something went wrong!"
        })
        

        this.children = {
            ...this.children,
            ErrorScreen
        };
    }
    render(): string {
        return (`
          {{{ErrorScreen}}}
        `)
    }
}
