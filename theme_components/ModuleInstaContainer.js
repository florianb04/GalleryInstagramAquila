import React from 'react';
import Lightbox from 'lightbox-react';
import axios from 'axios';
import {getAPIUrl} from 'aqlrc';
// import { NSContext } from './NSContext';
// import { NSToast } from './NSToast';
// import { getItemsGallery } from '../lib/GalleryLib';
// import 'lightbox-react/style.css'; // Ne fonctione apparemment pas dans aqlrc... à mettre dans le thème

/**
 *  Video - Classe utilisée par le composant NSGallery
 * @prop content: (string) url de la video YouTube (https://www.youtube.com/embed/{content})
 * @return {React.Component}
 */
const Video = (props, context) => (
    <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${props.content}`}
        style={{
            maxWidth  : '100%',
            position  : 'absolute',
            left      : 0,
            right     : 0,
            margin    : 'auto',
            top       : '50%',
            transform : 'translateY(-50%)',
        }}
        title={props.content}
    />
);

/**
 * NSGallery - Affiche une gallerie d'image / vidéo YouTube
 * @prop ns-code: (string) code de la gallery dans Aquila
 * @return {React.Component}
 */
export default class InstaContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            photoIndex : 0,
            isOpen     : false,
            nsGallery  : [],
            btnActif   : true,
        };
    }

    componentDidMount = async () => {
      // utiliser ma route avec Axios /v2/GalleryInstagramAquila/config pour récupérer les données de la gallery
      const galleryInsta = await axios.post(`${getAPIUrl()}v2/GalleryInstagramAquila/config`);
      console.log('galleryInsta: ', galleryInsta);
      this.setState({ nsGallery: galleryInsta.data });
      console.log('this.state ', this.state);
      
        window.addEventListener('popstate', (e) => {
            this.setState({ isOpen: false });
        });
    }

    openLightBox(i) {
        this.setState({ photoIndex: i, isOpen: true });
    }

    loadData = async () => {
        //get the data from my state nsGallery
        const code = this.state.nsGallery;
        // const code = this.props['ns-code'];

        // On récupére les items de la gallerie en fonction du code
        try {
            const galleryItems = await getItemsGallery(code);
            this.setState({ nsGallery: galleryItems, btnActif: false });
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                // NSToast.error(err.response.data.message);
            } else {
                // NSToast.error('common:error_occured');
                console.error(err);
            }
        }
    };

    render() {
        const maxWidthGallery = 1440;
        // const { Head, dynamic } = this.props.gNext;
        const { nsGallery, photoIndex, isOpen } = this.state;
        if (!nsGallery) {
            console.error("Impossible d'afficher le composant Gallery, veuillez verifier son ns-code", this.props['ns-code']);
            return <div>Impossible d'afficher le composant Gallery, veuillez verifier son ns-code</div>;
        }
        // les 2 prochaines lignes sont à modifier et adapter :
        // const { datas: imageOrVideos, maxColumnNumber } = nsGallery;
        // const imgVidUrl = imageOrVideos?.sort((a, b) => a.order - b.order).map((oImgOrVid, index) => {
        //     if (oImgOrVid.content) return { content: <Video content={oImgOrVid.content} />, alt: oImgOrVid.alt }; // comment this line due to use of video componoent
        //     return { content: oImgOrVid.src, alt: oImgOrVid.alt };

        // les 2 lignes COPY PASTE de la ligne ci-dessus
        const imageOrVideos = nsGallery;
        console.log('imageOrVideos: ', imageOrVideos);
        const imgVidUrl = imageOrVideos?.sort((a, b) => a.order - b.order).map((oImgOrVid, index) => {
            if (oImgOrVid.content) return { content: <Video content={oImgOrVid.content} />, alt: oImgOrVid.alt };
            return { content: oImgOrVid.src, alt: oImgOrVid.alt };

        });
        return (
            <>
                {/* <Head>
                    <link rel="stylesheet" href="/static/css/gallery.css" />
                </Head> */}
                <div className="NSGallery">
                    {typeof window !== 'undefined' && isOpen
                        && (
                            <Lightbox
                                mainSrc={imgVidUrl[photoIndex].content} // On recupére la 1ere img du srcset qui sera l'image taille réelle, src sera le thumbnail
                                nextSrc={imgVidUrl[(photoIndex + 1) % imgVidUrl.length].content}
                                prevSrc={imgVidUrl[(photoIndex + imgVidUrl.length - 1) % imgVidUrl.length].content}
                                imageTitle={imgVidUrl[photoIndex].alt}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                                onMovePrevRequest={() => this.setState({ photoIndex: (photoIndex + imgVidUrl.length - 1) % imgVidUrl.length })}
                                onMoveNextRequest={() => this.setState({ photoIndex: (photoIndex + 1) % imgVidUrl.length })}
                            />
                        )}
                    <div className="gallery-grid">
                        {
                            imageOrVideos.sort((a, b) => a.order - b.order).map((oImgOrVid, i) => (
                                <div key={i} className="grid-item" onClick={() => this.openLightBox(i)}>
                                    <div className="overlay">
                                        <div className="text">{oImgOrVid.alt}</div>
                                    </div>
                                    {oImgOrVid.content
                                        ? <img src={`https://img.youtube.com/vi/${oImgOrVid.content}/0.jpg`} />
                                        // : <img src={`/images/gallery/376x257-80-crop-center/${oImgOrVid._id}/${oImgOrVid.alt || i}${oImgOrVid.extension}`} alt={oImgOrVid.alt} /* srcSet={oImgOrVid.srcset.toString()} */ />}
                                        // : <img src="https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/291065627_361269079449466_4101171663456043065_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=scontent-cdt1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=U0tXu0UuaasAX8PthDC&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=Mjg3MjA4Njk3NTc0Mjg5OTAwNg%3D%3D.2-ccb7-5&oh=00_AT-gLrRs89A8Be0MgLCv9W7U76Zluz5ehG19MDfRse_Q-g&oe=62E17B9C&_nc_sid=6136e7" alt={oImgOrVid.alt} /* srcSet={oImgOrVid.srcset.toString()} */ />}
                                        : <img src={oImgOrVid.src} alt={oImgOrVid.alt} /* srcSet={oImgOrVid.srcset.toString()} */ />}
                                </div>
                            ))
                        }
                    </div>
                    {/* <div className="load-more">
                        {this.state.btnActif && (nsGallery.datas.length !== nsGallery.count) ? <button onClick={this.loadData}>+</button> : ''}

                    </div> */}
                    {/* <style>
                        {`
                        .NSGallery .gallery-grid {
                            display: grid;
                            grid-gap: 36px;                    
                            grid-template-columns: repeat(${maxColumnNumber}, minmax(100px,1fr));
                            justify-items: center;
                            position: relative;
                        }

                        .NSGallery .grid-item img{
                            width: 376px;
                            height: 257px;
                            border: none;
                        }

                        @media screen and (max-width:${maxWidthGallery}px) {
                            .NSGallery .gallery-grid {
                                display: grid;
                                grid-gap: 36px;
                                grid-template-columns: repeat(auto-fill, minmax(354px,1fr));
                                position: relative;
                            }
                            
                            .NSGallery .grid-item img{
                                width: 354px;
                                height: 354px;
                                border: 10px solid #FFFFFF;
                                object-fit: cover;
                            }
                        }
                    `}
                    </style> */}
                </div>
            </>
        );
    }

    // static contextType = NSContext;
}
