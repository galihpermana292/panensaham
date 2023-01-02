import Slider from "react-slick";
import './Market.css'
import { GrNext,GrPrevious} from "react-icons/gr";
import Gplay from "../../assets/logogoogleplay.png"
import AppStore from "../../assets/appstore.png"
import MonikaImage from "../../assets/xgambarmonika.png"
import { TiArrowUnsorted } from "react-icons/ti";
import { ringkasanSaham } from "../dummy/ringkasanSaham";
import { introductionMonica } from "../dummy/IntroductionMonica";
import { indexGraph } from "../dummy/indexGraph";
import { IoMdArrowDropup } from "react-icons/io";



function Market() {
    
    const settings = {
        infinite:false,
        className: "text-center w-100",
        slidesToShow: 5,
        swipeToSlide: true,
        nextArrow:<GrNext/>,
        prevArrow:<GrPrevious/>,
    }
        

    return(
        <div className="container mt-5 pt-5 ">
        <h4 className="text-left text-title font-weight-bold">Index</h4>
        {/* /Slider Index Graph */}
        <div className="w-100">
            <Slider {...settings}>
                {indexGraph.map((item, index) => (
                    <div className="part-slider">
                        <div className="d-flex justify-content-between p-2">
                            <div>{item.title}</div> 
                            <div>{item.number}</div>
                        </div>
                        <div className= {item.percen > 3.00 ? 'text-left p-2 text-success' : 'text-left p-2 text-danger'}>
                            {item.percen > 3.00 ? '+'+item.percen : '-'+item.percen} %
                        </div>
                    </div>
                ))} 
            </Slider>
        </div> 

        {/* IHSG GRAFIK */}
        <div className="border rounded mt-3">
            <div className="w-100 p-3">    
                <h4 className="text-left text-title font-weight-bold pl-3">IHSG</h4>
                <p className="text-left pl-3 sub-ihsg">Index Harga Saham Gabungan</p> 
                <hr/>
                <div className="text-left d-flex flex-row pl-3">
                <div className="w-25 val-ihsg ">
                    <span className="font-weight-bold">7,041.31  </span> 
                    <span className="text-success">  <IoMdArrowDropup/> +35,27 (+0.34)</span></div>
                <div className="detail val-ihsg">11.15 B</div>
                <div className="val-ihsg">32.98 B</div>
                </div> 
                
                <div className="text-left d-flex flex-row pl-3">
                    <div className="w-25 sub-ihsg" >monday 11:30 WIB</div>
                    <div className="detail sub-ihsg">Value</div>
                    <div className="sub-ihsg">Avg Value</div> 
                </div> 
            </div>
        </div>

        {/* Ringkasan Saham Table */}
        <div className="rounded mt-3 ">
            <div className="d-flex justify-content-between m-3">
                <h4 className="text-left text-title font-weight-bold">Ringkasan Saham</h4>
                <select class="form-select border rounded " >
                    <option selected>Pilih Index</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="w-100 table  table-bordered ">
                    <thead>
                        <tr className="table-dark text-dark"> 
                            <th scope="col">Code <TiArrowUnsorted/></th>
                            <th scope="col">Last <TiArrowUnsorted/></th>
                            <th scope="col">Change <TiArrowUnsorted/></th>
                            <th scope="col">% <TiArrowUnsorted/></th>
                            <th scope="col">Frequency <TiArrowUnsorted/></th>
                            <th scope="col">Volume <TiArrowUnsorted/></th>
                            <th scope="col">Value <TiArrowUnsorted/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ringkasanSaham.map((item, index) => (
                            <tr>
                                <td>{item.code}</td>
                                <td>{item.last}</td>
                                <td>{item.change}</td>
                                <td className={item.percen >= 0.5 ? 'text-success' : 'text-danger'}>
                                    + {item.percen} %
                                </td>
                                <td>{item.frequency}</td>
                                <td>{item.volume}</td>
                                <td>{item.value} B</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

         {/* Title introduction Monica  */}
        <div className="title-display d-md-flex d-lg-flex justify-content-between mt-2 ">
            <h4 className="text-left text-title text-dark font-weight-bold">Mengenal Monica Lebih Dekat!</h4>
            <p className="text-left sub-title-intro">Pelajari Lebih Lanjut</p>
        </div> 

        {/* Card Introduction Monica */}
        <div className="d-lg-flex d-md-flex  w-lg-100% justify-content-between">
            {introductionMonica.map((item, index) => (
                <div class="card m-2 pt-2">
                    <img class="img-card" src={item.img} alt="Card image cap"/>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{item.title}</h5>
                        <p class="card-text">{item.content}</p>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Footer */}
        <div className="footer d-lg-flex w-100 justify-content-lg-between mt-5 mb-5">
            <div className="footer-title w-lg-25% text-left">   
                <p className="w-75">Download MONIKA dan   Jadi Investor Cerdas Sekarang!</p>
                <img src={Gplay} className="mr-2"></img>
                <img src={AppStore} className="ml-2"></img>
            </div>
            <div className="w-lg-25%">    
                <img src={MonikaImage}></img>
            </div>
        </div>
    </div>

    );
}

export default Market;