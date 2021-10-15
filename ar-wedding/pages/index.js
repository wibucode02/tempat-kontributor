import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Img from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import moment from "moment-timezone";

const useAudio = (url) => {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    const toggleMusic = async () =>
      playing ? await audio.play() : await audio.pause();

    if (audio) {
      toggleMusic();
    }
  }, [playing, audio]);

  useEffect(() => {
    if (!audio) {
      setAudio(new Audio(url));
    }
    if (audio) {
      audio.addEventListener("ended", () => setPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setPlaying(false));
        setAudio(null);
      }
    };
  }, [audio, url]);

  return [playing, toggle];
};

async function submitForm(e, params, setName = null) {
  e.preventDefault();

  if (params && params.constructor === Object) {
    if (!Boolean(params.name)) {
      alert("Harap isi nama");
      return false;
    }
    const res = await fetch(`/api/attend`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      setName("");
      alert("Terima kasih telah mengisi " + params.name || null);
    }

    if (res.status === 429) {
      alert("Maaf, kamu sudah mengisi nama");
    }

    return true;
  }
}

export default function Home() {
  const [playing, toggle] = useAudio("/music/wedding.mp3");
  const [name, setName] = useState("");

  const startDatetime = moment("2021-10-10 13:00").tz("Asia/Jakarta");
  const endDatetime = startDatetime.clone().add(4, "hours");
  const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();

  const [event, setEvent] = useState({
    title: "Acara Nikah Rianti & Afif",
    description:
      "Event acara resepsi nikah rianti & afif yang diselenggarakan pada tanggal 10 oktober 2021",
    location: "Jl. Ploso IX-A no. 10, Surabaya, Jawa Timur",
    startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
    endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
    duration,
  });

  const Button = ({ children, onClick }) => (
    <a className="btn btn-default btn-sm" onClick={onClick}>
      {children}
    </a>
  );
  const Dropdown = ({ children }) => (
    <ul className="dropdown animated-fast fadeInUpMenu">{children}</ul>
  );
  const AddToCalendarDropdown = AddToCalendarHOC(Button, Dropdown);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Wedding &mdash; Rianti & Afif</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Rianti & Afif Wedding Website" />
        <meta
          name="keywords"
          content="afif, rianti, wedding, nikah, kawin, nikahan, afif abdillah jusuf, rianti dwi lestari, akad, akad nikah, landing page, resepsi, resepsi nikah"
        />
        <meta name="author" content="afifjusuf.id" />

        {/* Facebook and Twitter integration */}
        <meta property="og:title" content="Wedding - Rianti & Afif" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://afifjusuf.id/wedding" />
        <meta property="og:site_name" content="Rianti & Afif Wedding Website" />
        <meta
          property="og:description"
          content="Rianti & Afif Wedding Website"
        />
        <meta name="twitter:title" content="Wedding - Rianti & Afif" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:url" content="https://afifjusuf.id/wedding" />
        <meta name="twitter:card" content="" />
      </Head>
      {/* modernizr */}
      <Script
        strategy="beforeInteractive"
        src="/js/modernizr-2.6.2.min.js"
      ></Script>
      {/* // jQuery */}
      <Script strategy="beforeInteractive" src="/js/jquery.min.js"></Script>
      {/* // jQuery Easing */}
      <Script
        strategy="beforeInteractive"
        src="/js/jquery.easing.1.3.js"
      ></Script>
      {/* // Bootstrap */}
      <Script strategy="beforeInteractive" src="/js/bootstrap.min.js"></Script>
      {/* // Waypoints */}
      <Script
        strategy="beforeInteractive"
        src="/js/jquery.waypoints.min.js"
      ></Script>
      {/* // Carousel */}
      <Script
        strategy="beforeInteractive"
        src="/js/owl.carousel.min.js"
      ></Script>
      {/* // countTo */}
      <Script strategy="beforeInteractive" src="/js/jquery.countTo.js"></Script>

      {/* // Stellar */}
      <Script
        strategy="beforeInteractive"
        src="/js/jquery.stellar.min.js"
      ></Script>
      {/* // Magnific Popup */}
      <Script
        strategy="beforeInteractive"
        src="/js/jquery.magnific-popup.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/js/magnific-popup-options.js"
      ></Script>

      <Script
        strategy="beforeInteractive"
        src="/js/simplyCountdown.js"
      ></Script>
      {/* // Main */}
      <Script strategy="beforeInteractive" src="/js/main.js"></Script>
      <Script id="my-script">
        {`
        var d = new Date("2021-10-10");

        // default example
        simplyCountdown('.simply-countdown-one', {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        });

        //jQuery example
        $('#simply-countdown-losange').simplyCountdown({
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate(),
            enableUtc: false
        });`}
      </Script>

      <div className="fh5co-loader" />
      <div id="page">
        <header
          id="fh5co-header"
          className="fh5co-cover"
          role="banner"
          style={{ backgroundImage: "url(/images/img_bg_2.jpg)" }}
          data-stellar-background-ratio="0.5"
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <div className="display-t">
                  <div
                    className="display-tc animate-box"
                    data-animate-effect="fadeIn"
                  >
                    <h1>Rianti &amp; Afif</h1>
                    <h2>Alhamdulillah, kita telah menikah</h2>
                    <div className="simply-countdown simply-countdown-one"></div>
                    <AddToCalendarDropdown
                      className="has-dropdown"
                      event={event}
                      buttonText="Save the date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* pembukaan */}
        <div id="fh5co-couple">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
                <h2 style={{ fontSize: "3.5rem!important" }}>
                  Assalamu&apos;alaikum
                </h2>
                <h3>بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيْمِ</h3>
                <h3>Salam sejahtera bagi kita semua</h3>
                <h3>10 Oktober 2021</h3>
                <p>Acara resepsi pernikahan kami</p>
              </div>
            </div>
            <div className="couple-wrap animate-box">
              <div className="couple-half">
                <div className="bride">
                  <Img
                    src="/images/bride.jpg"
                    alt="bride"
                    className="img-responsive"
                    width="300"
                    height="300"
                    // layout="fill"
                  />
                </div>
                <div className="desc-bride">
                  <h3>Rianti Dwi Lestari</h3>
                  <p>
                    Assalamu&apos;alaikum, perkenalkan nama saya Rianti, panggil
                    saja Ria. Sah istri dari Afif Abdillah Jusuf, saya meminta
                    doa dan restu semoga pernikahan saya menjadi cinta yang
                    abadi di dunia maupun di akhirat, aamiin.
                  </p>
                </div>
              </div>
              <p className="heart text-center">
                <i className="icon-heart2"></i>
              </p>
              <div className="couple-half">
                <div className="groom">
                  <Img
                    src="/images/groom.jpg"
                    alt="groom"
                    className="img-responsive"
                    width="300"
                    height="300"
                    // layout="fill"
                  />
                </div>
                <div className="desc-groom">
                  <h3>Afif Abdillah Jusuf</h3>
                  <p>
                    Perkenalkan saya Afif, panggil saja Apep, sah suami dari
                    Rianti Dwi Lestari. Saya hanya seorang manusia yang tampil
                    sederhana meminang istri saya dengan bismillah atas ridho
                    Allah SWT. Saya meminta doa restu dari kalian atas
                    pernikahan saya. Terima kasih.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* event */}
        <div
          id="fh5co-event"
          className="fh5co-bg"
          style={{ backgroundImage: "url(/images/img_bg_3.jpg)" }}
        >
          <div className="overlay"></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
                <span>Daftar Acara Kami</span>
                <h2>Acara Nikah</h2>
              </div>
            </div>
            <div className="row">
              <div className="display-t">
                <div className="display-tc">
                  <div className="col-md-10 col-md-offset-1">
                    <div className="col-md-6 col-sm-6 text-center">
                      <div className="event-wrap animate-box">
                        <h3>Akad Nikah</h3>
                        <div className="col-sm-4 event-col">
                          <i className="icon-clock"></i>
                          <span>09:00 - 11:00 WIB</span>
                        </div>
                        <div className="col-sm-4 event-col">
                          <i className="icon-calendar"></i>
                          <span>Kamis, 15 Juli 2021</span>
                        </div>
                        <div className="col-sm-4 event-col">
                          <i className="icon-location2"></i>
                          <span>
                            <Link
                              href="https://goo.gl/maps/Toa9NdLdhPCojxE8A"
                              passHref
                            >
                              <a
                                style={{
                                  color: "whitesmoke",
                                }}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <strong>Masjid Subulussalam </strong>
                                <i className="icon-arrow-with-circle-up"></i>
                              </a>
                            </Link>
                          </span>
                        </div>
                        <p style={{ marginTop: "10%" }}>
                          Atas doa dan restu kalian, Alhamdulillah acara Akad
                          Nikah telah diselenggarakan dan berjalan lancar. Tanpa
                          mengurangi rasa hormat, kami tidak mengundang kalian
                          karena suasana pandemi saat itu masih tidak begitu
                          baik, maka acara diselenggarakan dengan orang yang
                          terbatas sesuai anjuran pemerintah. Mohon dimaklumi
                          terima kasih.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 text-center">
                      <div className="event-wrap animate-box">
                        <h3>Resepsi</h3>
                        <div className="col-sm-4 event-col">
                          <i className="icon-clock"></i>
                          <span>13:00 - 20:00 WIB</span>
                        </div>
                        <div className="col-sm-4 event-col">
                          <i className="icon-calendar"></i>
                          <span>Minggu, 10 Oktober 2021</span>
                        </div>
                        <div className="col-sm-4 event-col">
                          <i className="icon-location2"></i>
                          <span>
                            <Link
                              href="https://goo.gl/maps/kaC4hyjZh1h1okG46"
                              passHref
                            >
                              <a
                                style={{
                                  color: "whitesmoke",
                                }}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <strong>Jl. Ploso IX-A No. 10 </strong>
                                <i className="icon-arrow-with-circle-up"></i>
                              </a>
                            </Link>
                          </span>
                        </div>
                        <p>
                          Bismillah, kedepannya kami akan mengadakan acara
                          resepsi pernikahan kami, tanpa mengurangi rasa hormat
                          dimohon untuk hadir dengan memakai masker dan hand
                          sanitizer. Tidak luput juga meminta doa dan restu dari
                          kalian semua agar acara berjalan dengan normal, terima
                          kasih.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* couple story */}
        <div id="fh5co-couple-story">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
                <h2>Cerita Kami</h2>
                <p>
                  Perjalanan singkat kami mulai saat pertama kali kenal, bertemu
                  kembali, hingga menjadi pasangan sah.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-md-offset-0">
                <ul className="timeline animate-box">
                  <li className="animate-box">
                    <div
                      className="timeline-badge"
                      style={{ backgroundImage: "url(/images/couple-1.jpg)" }}
                    ></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">
                          Saat Jadi Teman Sekelas
                        </h3>
                        <span className="date">2012</span>
                      </div>
                      <div className="timeline-body">
                        <p>
                          Di sekolah SMPN 37 Surabaya, Kami menjadi teman
                          sekelas, yaitu saat memasuki kelas 9 yang dimana saat
                          itu tahun ajarannya adalah 2012. Kami tidak begitu
                          akrab, hanya sekedar kenal saja.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted animate-box">
                    <div
                      className="timeline-badge"
                      style={{ backgroundImage: "url(/images/couple-2.jpg)" }}
                    ></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">Ketemu Lagi</h3>
                        <span className="date">Desember 2017</span>
                      </div>
                      <div className="timeline-body">
                        <p>
                          Kami dipertemukan kembali pada tempat kerja yang
                          bersebelahan, tempat kerja kami hanya beda gedung
                          saja. Saat itu Afif bertempat kerja di Graha Bumi
                          Surabaya, sedangkan Rianti bertempat kerja di Hotel
                          Bumi Surabaya. Kami mulai berkenalan dan saling sapa
                          lewat sosial media. Disinilah awal kami mulai PDKT dan
                          berpacaran :).
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="animate-box">
                    <div
                      className="timeline-badge"
                      style={{ backgroundImage: "url(/images/couple-3.jpg)" }}
                    ></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">Lamaran</h3>
                        <span className="date">20 Desember 2020</span>
                      </div>
                      <div className="timeline-body">
                        <p>
                          3 tahun lamanya kami berpacaran dan mulai memutuskan
                          untuk ke langkah yang lebih jauh lagi. Afif mulai
                          berniat melamar pasangannya, Rianti dengan bismillah
                          tawakallah
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="timeline-inverted animate-box">
                    <div
                      className="timeline-badge"
                      style={{ backgroundImage: "url(/images/couple-4.jpg)" }}
                    ></div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <h3 className="timeline-title">Akad Nikah</h3>
                        <span className="date">15 Juli 2021</span>
                      </div>
                      <div className="timeline-body">
                        <p>
                          Alhamdulillah, dengan ridho Allah SWT, Afif melangkah
                          lebih jauh lagi dengan meminang pasangannya, Rianti
                          menjadi istri sah. Banyak rintangan yang kami hadapi,
                          salah satunya kondisi pandemi Covid-19 yang lagi
                          tinggi saat itu, harus melakukan syarat dan anjuran
                          pemerintah dengan orang yang terbatas. Akan tetapi,
                          Alhamdulillah acara berjalan dengan lancar
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Coming Soon (Ngenteni Post Wedding disik) */}
        <div id="fh5co-gallery" className="fh5co-section-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
                <h2>Foto Foto</h2>
                <p>Coming Soon!</p>
                <p>(Ditunggu ya, kita belum foto post weddingnya)</p>
              </div>
            </div>
            {/* <div className="row row-bottom-padded-md">
              <div className="col-md-12">
                <ul id="fh5co-gallery-list">
                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundImage: "url(/images/gallery-1.jpg)" }}
                  >
                    <a href="images/gallery-1.jpg">
                      <div className="case-studies-summary">
                        <span>14 Photos</span>
                        <h2>Two Glas of Juice</h2>
                      </div>
                    </a>
                  </li>
                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundImage: "url(/images/gallery-2.jpg)" }}
                  >
                    <a href="#" className="color-2">
                      <div className="case-studies-summary">
                        <span>30 Photos</span>
                        <h2>Timer starts now!</h2>
                      </div>
                    </a>
                  </li>

                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundImage: "url(/images/gallery-3.jpg)" }}
                  >
                    <a href="#" className="color-3">
                      <div className="case-studies-summary">
                        <span>90 Photos</span>
                        <h2>Beautiful sunset</h2>
                      </div>
                    </a>
                  </li>
                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-4.jpg)" }}
                  >
                    <a href="#" className="color-4">
                      <div className="case-studies-summary">
                        <span>12 Photos</span>
                        <h2>{"Company's Conference Room"}</h2>
                      </div>
                    </a>
                  </li>

                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-5.jpg)" }}
                  >
                    <a href="#" className="color-3">
                      <div className="case-studies-summary">
                        <span>50 Photos</span>
                        <h2>Useful baskets</h2>
                      </div>
                    </a>
                  </li>
                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-5.jpg)" }}
                  >
                    <a href="#" className="color-4">
                      <div className="case-studies-summary">
                        <span>45 Photos</span>
                        <h2>Skater man in the road</h2>
                      </div>
                    </a>
                  </li>

                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-7.jpg)" }}
                  >
                    <a href="#" className="color-4">
                      <div className="case-studies-summary">
                        <span>35 Photos</span>
                        <h2>Two Glas of Juice</h2>
                      </div>
                    </a>
                  </li>

                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-8.jpg)" }}
                  >
                    <a href="#" className="color-5">
                      <div className="case-studies-summary">
                        <span>90 Photos</span>
                        <h2>Timer starts now!</h2>
                      </div>
                    </a>
                  </li>
                  <li
                    className="one-third animate-box"
                    data-animate-effect="fadeIn"
                    style={{ backgroundIimage: "url(/images/gallery-9.jpg)" }}
                  >
                    <a href="#" className="color-6">
                      <div className="case-studies-summary">
                        <span>56 Photos</span>
                        <h2>Beautiful sunset</h2>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>

        {/* countdown */}
        <div
          id="fh5co-counter"
          className="fh5co-bg fh5co-counter"
          style={{ backgroundImage: "url(/images/img_bg_5.jpg)" }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="display-t">
                <div className="display-tc">
                  <div className="col-md-6 col-sm-6 animate-box">
                    <div className="feature-center">
                      <span className="icon">
                        <i className="icon-users"></i>
                      </span>

                      <span
                        className="counter js-counter"
                        data-from="0"
                        data-to="450"
                        data-speed="5000"
                        data-refresh-interval="50"
                      >
                        1
                      </span>
                      <span className="counter-label">Perkiraan Undangan</span>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 animate-box">
                    <div className="feature-center">
                      <span className="icon">
                        <i className="icon-bowl"></i>
                      </span>

                      <span
                        className="counter js-counter"
                        data-from="0"
                        data-to="1000"
                        data-speed="5000"
                        data-refresh-interval="50"
                      >
                        1
                      </span>
                      <span className="counter-label">Perkiraan Catering</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form attending */}
        <div
          id="fh5co-started"
          className="fh5co-bg"
          style={{ backgroundImage: "url(/images/img_bg_4.jpg)" }}
        >
          <div className="overlay"></div>
          <div className="container">
            <div className="row animate-box">
              <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
                <h2>Sudah Datang?</h2>
                <p>
                  Silakan isi nama untuk nandain kalau kamu sudah datang ya
                  🥺👉👈
                </p>
                <p>Kalau bisa yang kasih nama lengkap biar gk bingung 😊</p>
              </div>
            </div>
            <div className="row animate-box">
              <div className="col-md-10 col-md-offset-1">
                <form
                  name="attendForm"
                  action="/api/attend"
                  method="post"
                  onSubmit={async (e) => await submitForm(e, { name }, setName)}
                  className="form-inline"
                >
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        placeholder="Nama kamu siapa?"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <button type="submit" className="btn btn-default btn-block">
                      Hadir ✋
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer id="fh5co-footer" role="contentinfo">
          <div className="container">
            <div className="row copyright">
              <div className="col-md-12 text-center">
                <p>
                  <small className="block">
                    &copy; {new Date().getFullYear()} {""}
                    <Link href="https://afifjusuf.id" passHref>
                      <a>afifjusuf.id</a>
                    </Link>
                    . All Rights Reserved.
                  </small>
                  <small className="block">
                    Thanks for Design{" "}
                    <Link href="https://freehtml5.co/" passHref>
                      <a target="_blank" rel="noreferrer">
                        FREEHTML5.co
                      </a>
                    </Link>
                  </small>
                  <small className="block">
                    Thanks for Music{" "}
                    <Link href="https://youtu.be/_pR_cW4bDeE" passHref>
                      <a target="_blank" rel="noreferrer">
                        Ungu Feat. Andien - Saat Bahagia | VC Trinity
                      </a>
                    </Link>
                  </small>
                  <small>
                    Thanks for Backgrounds{" "}
                    <Link
                      href="https://www.freepik.com/photos/background"
                      passHref
                    >
                      <a target="_blank" rel="noreferrer">
                        Background photo created by jcomp - www.freepik.com
                      </a>
                    </Link>
                  </small>
                </p>
                <ul className="fh5co-social-icons">
                  <li>
                    <Link href="https://twitter.com/bungambohlah" passHref>
                      <a target="_blank" rel="noreferrer">
                        <i className="icon-twitter"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://instagr.am/afif.abdillah.j" passHref>
                      <a target="_blank" rel="noreferrer">
                        <i className="icon-instagram"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://fb.me/rudrafentje.samasamagila"
                      passHref
                    >
                      <a target="_blank" rel="noreferrer">
                        <i className="icon-facebook"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://linkedin.com/in/afifjusuf/" passHref>
                      <a target="_blank" rel="noreferrer">
                        <i className="icon-linkedin"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://youtube.com/channel/UCgXeikUYtBItdbE1_Lw9y1w"
                      passHref
                    >
                      <a target="_blank" rel="noreferrer">
                        <i className="icon-youtube"></i>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="https://afifjusuf.id" passHref>
                      <a>
                        <i className="icon-globe2"></i>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        {/* go to top button */}
        <div className="gototop js-top">
          <a href="#" className="js-gotop">
            <i className="icon-arrow-up"></i>
          </a>
        </div>

        {/* music button */}
        <div className="musicbtn">
          <a onClick={toggle}>
            {playing ? (
              <i className="icon-pause"></i>
            ) : (
              <i className="icon-play"></i>
            )}
          </a>
        </div>
      </div>
    </>
  );
}
