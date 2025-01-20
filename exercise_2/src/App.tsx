import { Box, Button, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { CAROUSEL } from "./constants/carousel";
import { Autoplay, Navigation } from "swiper/modules";
import { Icon } from "@iconify/react";
import { useRef } from "react";


import "swiper/css";
import "swiper/css/navigation";



const App = () => {
  const swiperRef = useRef<any>(null); 

  const swiperItems = () => {
    return CAROUSEL?.map((item, index) => (
      <SwiperSlide key={`carousel${index}`}>
        <Box
          component="img"
          src={item?.url}
          alt={item?.name}
          sx={{
            width: "190px",
            height: "380px",
            objectFit: "cover",
            borderRadius: "8px",
            transform: index % 2 !== 0 ? `translate(0,-5%)` : `translate(0,5%)`,
          }}
        />
      </SwiperSlide>
    ));
  };


  const handlePrev = () => {
    if (swiperRef.current && swiperRef?.current?.swiper) {
      swiperRef?.current?.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ maxWidth: "80%", margin: "0 auto" }} gap={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            textAlign: "center",
            width: "60%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              width: "6rem",
              height: "6rem",
            }}
            component="img"
            src="/networking.gif"
            alt="Networking"
          />
          <Typography variant="h4" fontWeight="bold">
            Hoạt động tiêu biểu từ cộng đồng giáo dục
          </Typography>
          <Typography>
            Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá
            trình giảng dạy, dạy học ứng dụng công nghệ SHub Classroom.
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Swiper
            ref={swiperRef} 
            modules={[Autoplay, Navigation]}
            loop={true}
            spaceBetween={50}
            slidesPerView={6}
            speed={200}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            style={{
              width: "100%",
              padding: "30px 10px",
            }}
          >
            {swiperItems()}
          </Swiper>
          <Button
            onClick={handlePrev} 
            sx={{
              minWidth: "3rem",
              height: "3rem",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              left: "-20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              padding: 0,
              "&:hover": {
                backgroundColor: "white",
              },
              ":focus": {
                outline: "none",
              },
            }}
          >
            <Icon
              color="black"
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              icon={"uil:arrow-left"}
            />
          </Button>
          <Button
            onClick={handleNext} 
            sx={{
              minWidth: "3rem",
              height: "3rem",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              right: "-20px",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              padding: 0,
              "&:hover": {
                backgroundColor: "white",
              },
              ":focus": {
                outline: "none",
              },
            }}
          >
            <Icon
              color="black"
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              icon={"uil:arrow-right"}
            />
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default App;