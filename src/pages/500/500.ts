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
        const ErrorScreen = new CoverScreen({ code: 500, background: backgroundImg,
            text:"We are already fixing it"
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
