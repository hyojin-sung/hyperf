"use client";

import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import classNames from "classnames";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export const Outcomes: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const step1Y = useTransform(scrollYProgress, [0.05, 0.25], [250, -300]);
  const step1Opacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);

  const step2Y = useTransform(scrollYProgress, [0.3, 0.5], [200, 50]);
  const step2Opacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const x = useTransform(smoothScrollY, [0, 1], [0, -2600]);

  return (
    <div className="pt-[104px] pb-[114px]">
      <div className="">
        <Text
          variant="t1"
          className="text-center uppercase text-primary-normal text-[50px]"
        >
          Outcomes
        </Text>
        <Text variant="h4" className="text-center pt-12 text-primary-normal">
          예상성과
        </Text>
      </div>
      <div
        className="w-full relative "
        ref={sectionRef}
        style={{ height: "1250vh" }}
      >
        <div
          className="sticky w-100vw h-[1447px] -top-[120px] overflow-hidden  z-[90]"
          ref={stickyRef}
        >
          <div className="relative h-full">
            <motion.div style={{ x }} className="absolute bottom-0 w-[4602px]">
              <CustomImage
                src="images/bg/bg-logo.png"
                alt="HYPERF 로고"
                className="opacity-10 h-[994px] aspect-auto"
              />
            </motion.div>

            <motion.div
              style={{
                y: step1Y,
                opacity: step1Opacity,
              }}
              className={classNames(
                "relative flex items-center justify-center !z-[90]",
              )}
            >
              <Step1 />
            </motion.div>

            <motion.div
              style={{ y: step2Y, opacity: step2Opacity }}
              className={classNames(
                "absolute inset-0 flex items-center justify-center",
              )}
            >
              <Step2 />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Step1: React.FC = () => {
  return (
    <>
      {/* 단계 마름모 & Text*/}
      <div className="w-full flex flex-row justify-center gap-[143px] items-end pb-3">
        <div className="flex flex-col items-center gap-14">
          <Text
            variant="h4"
            className="text-center text-primary-normal !leading-[33.6px] whitespace-nowrap"
          >
            TVM의 기능적, 성능적 확장을
            <br />
            중심으로 희소 행렬 및 전력 예측을
            <br />
            활용한 최적화 목표
          </Text>
          <div className="relative">
            <CustomImage src="images/icons/rectangle.svg" alt="Step 1" />
            <div className="absolute inset-0 flex justify-center items-center z-20">
              <Text variant="h4" className="text-primary-normal">
                1단계
              </Text>
            </div>
          </div>
        </div>

        {/* 우측 Text & 박스 */}
        <div className=" max-w-[768px] grow shrink relative z-[90]">
          <div className="w-full h-full pb-[49px] bg-white">
            <Text variant="h4" className=" ">
              TVM 컴파일러를 HPC(고성능 컴퓨팅)를 사용해 확장
            </Text>
          </div>
          <StepBox
            title="HPC 프론트엔드(OpenMP/MPI C) 개발"
            purpose="목적 : 반복문 병렬화 및 최적화를 통해 TVM의 실행 성능 향상"
            tasks={[
              "반복문 분리 및 개별 함수화",
              "Tensor IR 기반 오토튜닝 및 코드생성",
              "오브젝트 파일 생성",
            ]}
          />
          <StepBox
            title="희소 행렬 최적화"
            purpose="목적 : 희소 행렬 포맷을 활용해 반복문 최적화 및 성능 개선"
            tasks={["희소 행렬 포맷 적용", "Blocked CSR 최적화"]}
          />
          <StepBox
            title="전력 예측 모델"
            purpose="목적 : 전력 소비를 고려한 성능 최적화"
            tasks={[
              "성능 카운터 기반 전력 모델 개발",
              "KNL 기반 모델 학습 및 최적화",
              "TVM 탐색 모델 통합",
            ]}
          />
          <StepBox
            title="전력 예측 기반 다목적 오토튜닝"
            purpose="목적 : 성능과 전력 소비의 균형을 맞춘 최적화를 달성"
            tasks={[
              "소비 전력 예측 모델 활용",
              "연산 패턴 기반 전력 예측 기술 적용",
              "TVM 탐색 모델 통합",
            ]}
          />
        </div>
      </div>
    </>
  );
};

const StepBox: React.FC<{
  title: string;
  purpose: string;
  tasks: string[];
}> = ({ title, purpose, tasks }) => {
  return (
    <>
      <div className="py-6 px-[28px] bg-primary-bg mt-6 flex-col justify-center border-2 border-black">
        <Text
          variant="h4"
          className="text-white pb-3 text-center !font-extrabold"
        >
          {title}
        </Text>

        <Text
          variant="h5"
          className="text-white pb-3 text-center !font-semibold"
        >
          {purpose}
        </Text>

        <Text
          variant="h5"
          className="text-white pb-3 text-center !font-semibold !text-[16px]"
        >
          핵심작업
        </Text>

        <div
          className={`grid gap-5 ${
            tasks.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {tasks.map((task, index) => (
            <div
              key={index}
              className={classNames(
                `bg-white flex justify-center items-center border-2 border-black py-[12px] box-border`,
                task.length % 2 === 0 && index === tasks.length - 1
                  ? "col-span-2"
                  : "",
              )}
            >
              <Text
                variant="h5"
                className="text-black !font-bold !text-[16px] tracking-tighter w-full text-center"
              >
                {task}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Step2: React.FC = () => {
  return (
    <div className="w-full flex flex-row justify-center gap-[143px] items-end pb-3">
      <div className="flex flex-col items-center gap-14">
        <Text
          variant="h4"
          className="text-center text-primary-normal !leading-[33.6px] flex-wrap"
        >
          오토튜닝의 실행 흐름과 피드백을
          <br /> 통합 관리하는 프레임워크로,
          <br /> 구성 요소 간 상호작용을 정교화하여
          <br /> 최적화 프로세스를 자동화.
        </Text>

        <div className="relative w-full h-fit">
          <div className="relative w-full h-[180px]">
            <CustomImage
              src="images/icons/rectangle.svg"
              alt="Step 1"
              className="absolute inset-0 z-10 overflow-hidden"
            />
            <CustomImage
              src="images/icons/rectangle-black.svg"
              alt="Step 2"
              className="absolute inset-0 -mt-[60px]"
              style={{
                clipPath: "inset(150px 0 0 0)", // 위쪽 70px 숨김
              }}
            />
          </div>
          <div className="absolute inset-0 flex justify-center items-center z-20 -mt-[26px]">
            <Text variant="h4" className="text-primary-normal">
              2단계
            </Text>
          </div>
        </div>
      </div>

      <div className="max-w-[728px] shrink grow flex-wrap">
        <Text variant="h4" className=" !leading-[33.6px]">
          오토튜닝 패스 및 구성 요소 간 피드백을 관리하는 인터페이스 설계
          <br />
          해당 인터렉션은 구성, 실행 순서, 오토튜닝 시간 등을 사용자의
          <br />
          요구 사항을 반영해 전체적으로 관리한다.
        </Text>
        {SECOND_STEP_CONTENT.map((box, index) => (
          <div
            key={index}
            //수정 필요
            className="px-7 bg-primary-bg pt-6 mt-6 pb-3 max-w-[728px] flex flex-col justify-center border-2 border-black"
          >
            <Text variant="h4" className="text-white pb-3 text-center">
              {box.title}
            </Text>
            {box.contents.map((content, idx) => (
              <div
                key={idx}
                className="w-full bg-white flex justify-center items-center mb-3 border-2 border-black"
              >
                <Text
                  variant="h5"
                  className="text-black !font-normal py-[12px] text-[16px]"
                >
                  {content}
                </Text>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SECOND_STEP_CONTENT = [
  {
    title: "TVM ↔ Job Scheduler",
    contents: [
      "TVM이 생성한 프로파일링 데이터를 스케줄러에 전달",
      "스케줄러는 자원 할당 및 실행 순서를 결정",
      "최적화 결과를 다시 TVM으로 전달",
    ],
  },
  {
    title: "Job Scheduler ↔ MPI",
    contents: [
      "네트워크 토폴로지에 따라 최적의 통신 알고리즘을 선택",
      "병렬 작업 간 데이터 전송을 최적화",
    ],
  },
  {
    title: "MPI ↔ Parallel File I/O",
    contents: [
      "병렬 작업에 맞는 I/O 설정 최적화",
      "실행 결과를 TVM으로 전달하여 피드백 루프 형성",
    ],
  },
];
