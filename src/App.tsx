import { useState } from "react"

function DrivingCar() {
  const [replay, setReplay] = useState(0)
  return (
    <button
      className="car-replay"
      onClick={() => setReplay((value) => value + 1)}
      aria-label="Replay the car video"
      title="Click to replay the video"
    >
      <video
        key={replay}
        className="car-video block size-full object-cover will-change-transform motion-safe:animate-[drive-forward_5s_cubic-bezier(0.18,0.65,0.3,1)_both]"
        src="/assets/car-drive.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </button>
  )
}

const assetPathPrefix = "/assets"
const imgVehicle = `${assetPathPrefix}/07f21.png`
const imgMap = `${assetPathPrefix}/9146e.png`
const imgLayoutDashboard = `${assetPathPrefix}/58463.svg`
const imgCarFront = `${assetPathPrefix}/aee1d.svg`
const imgCalendarDays = `${assetPathPrefix}/bef68.svg`
const imgMapPin = `${assetPathPrefix}/3a867.svg`
const imgSettings = `${assetPathPrefix}/ee3c9.svg`
const imgChevronDown = `${assetPathPrefix}/ed163.svg`
const imgStatus = `${assetPathPrefix}/dc86f.svg`
const imgVehicleSelector = `${assetPathPrefix}/be87f.svg`
const imgArrowUpRight = `${assetPathPrefix}/fc1c2.svg`
const imgLocationPin = `${assetPathPrefix}/71109.svg`
const imgBatteryCharging = `${assetPathPrefix}/69601.svg`
const imgChevronLeft = `${assetPathPrefix}/46411.svg`
const imgChevronRight = `${assetPathPrefix}/17246.svg`
const imgClock3 = `${assetPathPrefix}/35788.svg`
const imgToggle = `${assetPathPrefix}/ee4c6.svg`
const imgEllipsis = `${assetPathPrefix}/e7c75.svg`
const imgWrench = `${assetPathPrefix}/3ccde.svg`
const imgChevronRight1 = `${assetPathPrefix}/594c2.svg`
const imgDroplets = `${assetPathPrefix}/5d9f9.svg`
const imgShieldCheck = `${assetPathPrefix}/19390.svg`
const imgFileText = `${assetPathPrefix}/6d980.svg`
const imgDivider = `${assetPathPrefix}/09f81.svg`
const imgArrowRight = `${assetPathPrefix}/189a0.svg`
const imgConnectionStatus = `${assetPathPrefix}/35dbb.svg`
const imgMessageCircle = `${assetPathPrefix}/fca18.svg`
const imgWifi = `${assetPathPrefix}/a64c4.svg`

export default function VehicleDashboard() {
  return (
    <div
      className="dashboard bg-[#eaeaec] content-stretch flex items-start relative size-full"
      data-node-id="1:14"
      data-name="Vehicle dashboard"
    >
      <div
        className="bg-[#eaeaec] content-stretch flex flex-col h-full items-center justify-between overflow-clip pb-[calc(28*var(--unit))] pt-[calc(25*var(--unit))] relative shrink-0 w-[calc(76*var(--unit))]"
        data-node-id="1:15"
        data-name="Sidebar"
      >
        <p
          className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[#1e211f] text-[length:calc(18*var(--unit))] whitespace-nowrap"
          data-node-id="1:16"
        >
          VH
        </p>
        <div
          className="content-stretch flex flex-col gap-[calc(12*var(--unit))] items-center relative shrink-0"
          data-node-id="1:17"
          data-name="Navigation"
        >
          <div
            className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(12*var(--unit))] shadow-[0px_4px_12px_0px_rgba(24,32,27,0.06)] shrink-0 size-[calc(40*var(--unit))]"
            data-node-id="1:18"
            data-name="Navigation item"
          >
            <div
              className="relative shrink-0 size-[calc(17*var(--unit))]"
              data-node-id="1:19"
              data-name="layout-dashboard"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgLayoutDashboard}
              />
            </div>
          </div>
          <div
            className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(12*var(--unit))] shrink-0 size-[calc(40*var(--unit))]"
            data-node-id="1:21"
            data-name="Navigation item"
          >
            <div
              className="relative shrink-0 size-[calc(17*var(--unit))]"
              data-node-id="1:22"
              data-name="car-front"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgCarFront}
              />
            </div>
          </div>
          <div
            className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(12*var(--unit))] shrink-0 size-[calc(40*var(--unit))]"
            data-node-id="1:24"
            data-name="Navigation item"
          >
            <div
              className="relative shrink-0 size-[calc(17*var(--unit))]"
              data-node-id="1:25"
              data-name="calendar-days"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgCalendarDays}
              />
            </div>
          </div>
          <div
            className="bg-[rgba(0,0,0,0)] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(12*var(--unit))] shrink-0 size-[calc(40*var(--unit))]"
            data-node-id="1:27"
            data-name="Navigation item"
          >
            <div
              className="relative shrink-0 size-[calc(17*var(--unit))]"
              data-node-id="1:28"
              data-name="map-pin"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgMapPin}
              />
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[calc(40*var(--unit))]"
          data-node-id="1:30"
          data-name="Settings"
        >
          <div
            className="relative shrink-0 size-[calc(17*var(--unit))]"
            data-node-id="1:31"
            data-name="settings"
          >
            <img
              alt=""
              className="design-icon absolute block inset-0 max-w-none"
              src={imgSettings}
            />
          </div>
        </div>
      </div>
      <div
        className="content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px relative"
        data-node-id="1:33"
        data-name="Workspace"
      >
        <div
          className="content-stretch flex h-[calc(76*var(--unit))] items-center justify-between overflow-clip pl-[calc(42*var(--unit))] pr-[calc(34*var(--unit))] relative shrink-0 w-full"
          data-node-id="1:34"
          data-name="Header"
        >
          <div
            className="h-px relative shrink-0 w-[calc(120*var(--unit))]"
            data-node-id="1:35"
            data-name="Header balance"
          />
          <div
            className="bg-[#f5f5f1] content-stretch flex gap-[calc(4*var(--unit))] items-start p-[calc(4*var(--unit))] relative rounded-[calc(12*var(--unit))] shrink-0"
            data-node-id="1:36"
            data-name="Section navigation"
          >
            <div
              className="bg-white content-stretch flex items-start overflow-clip px-[calc(18*var(--unit))] py-[calc(10*var(--unit))] relative rounded-[calc(8*var(--unit))] shadow-[0px_2px_8px_0px_rgba(36,39,37,0.05)] shrink-0"
              data-node-id="1:37"
              data-name="Navigation tab"
            >
              <p
                className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))] whitespace-nowrap"
                data-node-id="1:38"
              >
                My Vehicle
              </p>
            </div>
            <div
              className="content-stretch flex items-start overflow-clip px-[calc(18*var(--unit))] py-[calc(10*var(--unit))] relative rounded-[calc(8*var(--unit))] shrink-0"
              data-node-id="1:39"
              data-name="Navigation tab"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(12*var(--unit))] whitespace-nowrap"
                data-node-id="1:40"
              >
                Service
              </p>
            </div>
            <div
              className="content-stretch flex items-start overflow-clip px-[calc(18*var(--unit))] py-[calc(10*var(--unit))] relative rounded-[calc(8*var(--unit))] shrink-0"
              data-node-id="1:41"
              data-name="Navigation tab"
            >
              <p
                className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(12*var(--unit))] whitespace-nowrap"
                data-node-id="1:42"
              >
                New Car
              </p>
            </div>
          </div>
          <div
            className="content-stretch flex gap-[calc(10*var(--unit))] items-center overflow-clip relative shrink-0"
            data-node-id="1:43"
            data-name="Profile"
          >
            <div
              className="bg-[#242725] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(999*var(--unit))] shrink-0 size-[calc(30*var(--unit))]"
              data-node-id="1:44"
              data-name="Profile picture"
            >
              <p
                className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[length:calc(10*var(--unit))] text-white whitespace-nowrap"
                data-node-id="1:45"
              >
                LH
              </p>
            </div>
            <p
              className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(12*var(--unit))] whitespace-nowrap"
              data-node-id="1:46"
            >
              Mr.KobitGurung
            </p>
            <div
              className="relative shrink-0 size-[calc(12*var(--unit))]"
              data-node-id="1:47"
              data-name="chevron-down"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgChevronDown}
              />
            </div>
            <div
              className="relative shrink-0 size-[calc(6*var(--unit))]"
              data-node-id="1:49"
              data-name="Status"
            >
              <img
                alt=""
                className="design-icon absolute block inset-0 max-w-none"
                src={imgStatus}
              />
            </div>
          </div>
        </div>
        <div
          className="content-stretch flex flex-[1_0_0] gap-[calc(24*var(--unit))] items-start min-h-px pb-[calc(32*var(--unit))] pl-[calc(42*var(--unit))] pr-[calc(32*var(--unit))] relative w-full"
          data-node-id="1:50"
          data-name="Dashboard content"
        >
          <div
            className="content-stretch flex flex-[1_0_0] flex-col gap-[calc(20*var(--unit))] h-full items-start min-w-px overflow-clip relative"
            data-node-id="1:51"
            data-name="Vehicle overview"
          >
            <div
              className="content-stretch flex flex-col h-[calc(500*var(--unit))] items-start overflow-clip pt-[calc(24*var(--unit))] px-[calc(18*var(--unit))] relative shrink-0 w-full"
              data-node-id="1:52"
              data-name="Vehicle hero"
            >
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[calc(10*var(--unit))] items-start not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
                data-node-id="1:53"
                data-name="Welcome"
              >
                <p
                  className="font-['Inter:Regular'] font-normal leading-[1.1] relative shrink-0 text-[#1e211f] text-[length:calc(42*var(--unit))]"
                  data-node-id="1:54"
                >
                  Welcome,Kobit
                </p>
                <p
                  className="font-['Inter:Medium'] font-medium leading-[normal] relative shrink-0 text-[#adb1ac] text-[length:calc(12*var(--unit))]"
                  data-node-id="1:55"
                >
                  Fri, October 2, 2026
                </p>
                <p
                  className="font-['Inter:Medium'] font-medium leading-[normal] relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                  data-node-id="1:56"
                >
                  142,928 KM
                </p>
              </div>
              <div
                className="-translate-x-1/2 absolute bottom-[calc(24*var(--unit))] h-[calc(332*var(--unit))] left-[calc(50%+30*var(--unit))] w-[calc(820*var(--unit))]"
                data-node-id="1:57"
                data-name="Vehicle"
              >
                <DrivingCar />
              </div>
              <div
                className="absolute bottom-[calc(22*var(--unit))] content-stretch flex gap-[calc(10*var(--unit))] items-center left-[calc(18*var(--unit))] overflow-clip"
                data-node-id="1:58"
                data-name="Vehicle identity"
              >
                <div
                  className="bg-[#1e211f] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(999*var(--unit))] shrink-0 size-[calc(28*var(--unit))]"
                  data-node-id="1:59"
                  data-name="Vehicle mark"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] not-italic relative shrink-0 text-[length:calc(9*var(--unit))] text-white whitespace-nowrap"
                    data-node-id="1:60"
                  >
                    911
                  </p>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[calc(2*var(--unit))] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                  data-node-id="1:61"
                  data-name="Vehicle name"
                >
                  <p
                    className="relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                    data-node-id="1:62"
                  >
                    911 Turbo s
                  </p>
                  <p
                    className="relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                    data-node-id="1:63"
                  >
                    MY 2023 · ABX 911
                  </p>
                </div>
              </div>
              <div
                className="absolute bottom-[calc(24*var(--unit))] h-[calc(14*var(--unit))] right-[calc(18*var(--unit))] w-[calc(64*var(--unit))]"
                data-node-id="1:64"
                data-name="Vehicle selector"
              >
                <img
                  alt=""
                  className="design-icon absolute block inset-0 max-w-none"
                  src={imgVehicleSelector}
                />
              </div>
            </div>
            <div
              className="content-stretch flex flex-[1_0_0] gap-[calc(16*var(--unit))] items-start min-h-px overflow-clip relative w-full"
              data-node-id="1:71"
              data-name="Quick overview"
            >
              <div
                className="bg-[#f5f5f1] border border-[#e0e2dc] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[calc(10*var(--unit))] h-full items-start min-w-px overflow-clip pt-[calc(20*var(--unit))] px-[calc(20*var(--unit))] relative rounded-[calc(18*var(--unit))]"
                data-node-id="1:72"
                data-name="Vehicle location"
              >
                <div
                  className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                  data-node-id="1:73"
                  data-name="Card header"
                >
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[calc(4*var(--unit))] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                    data-node-id="1:74"
                    data-name="Heading"
                  >
                    <p
                      className="relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                      data-node-id="1:75"
                    >
                      Vehicle Location
                    </p>
                    <p
                      className="relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:76"
                    >
                      Kárpát utca 36, Budapest
                    </p>
                  </div>
                  <div
                    className="bg-white content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(999*var(--unit))] shrink-0 size-[calc(30*var(--unit))]"
                    data-node-id="1:77"
                    data-name="Open map"
                  >
                    <div
                      className="relative shrink-0 size-[calc(13*var(--unit))]"
                      data-node-id="1:78"
                      data-name="arrow-up-right"
                    >
                      <img
                        alt=""
                        className="design-icon absolute block inset-0 max-w-none"
                        src={imgArrowUpRight}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="h-[calc(182*var(--unit))] relative rounded-tl-[calc(12*var(--unit))] rounded-tr-[calc(12*var(--unit))] shrink-0 w-full"
                  data-node-id="1:80"
                  data-name="Map"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[calc(12*var(--unit))] rounded-tr-[calc(12*var(--unit))] size-full"
                    src={imgMap}
                  />
                </div>
                <div
                  className="-translate-x-1/2 absolute bottom-[calc(69*var(--unit))] left-1/2 size-[calc(30*var(--unit))]"
                  data-node-id="1:81"
                  data-name="Location pin"
                >
                  <img
                    alt=""
                    className="design-icon absolute block inset-0 max-w-none"
                    src={imgLocationPin}
                  />
                </div>
              </div>
              <div
                className="bg-[#f5f5f1] border border-[#e0e2dc] border-solid content-stretch flex flex-col h-full items-start justify-between overflow-clip p-[calc(20*var(--unit))] relative rounded-[calc(18*var(--unit))] shrink-0 w-[calc(210*var(--unit))]"
                data-node-id="1:83"
                data-name="Driving range"
              >
                <div
                  className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                  data-node-id="1:84"
                  data-name="Card header"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))] whitespace-nowrap"
                    data-node-id="1:85"
                  >
                    Driving Range
                  </p>
                  <div
                    className="relative shrink-0 size-[calc(16*var(--unit))]"
                    data-node-id="1:86"
                    data-name="battery-charging"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgBatteryCharging}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                  data-node-id="1:88"
                  data-name="Range"
                >
                  <div
                    className="relative shrink-0 size-[calc(14*var(--unit))]"
                    data-node-id="1:89"
                    data-name="chevron-left"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronLeft}
                    />
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-col gap-[calc(2*var(--unit))] items-center leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                    data-node-id="1:91"
                    data-name="Value"
                  >
                    <p
                      className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#1e211f] text-[length:calc(36*var(--unit))]"
                      data-node-id="1:92"
                    >
                      410
                    </p>
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:93"
                    >
                      KM
                    </p>
                  </div>
                  <div
                    className="relative shrink-0 size-[calc(14*var(--unit))]"
                    data-node-id="1:94"
                    data-name="chevron-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronRight}
                    />
                  </div>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(11*var(--unit))] text-center w-full"
                  data-node-id="1:96"
                >
                  Fuel level 84%
                </p>
              </div>
              <div
                className="bg-[#f5f5f1] border border-[#e0e2dc] border-solid content-stretch flex flex-col h-full items-start justify-between overflow-clip p-[calc(20*var(--unit))] relative rounded-[calc(18*var(--unit))] shrink-0 w-[calc(240*var(--unit))]"
                data-node-id="1:97"
                data-name="Departure time"
              >
                <div
                  className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                  data-node-id="1:98"
                  data-name="Card header"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))] whitespace-nowrap"
                    data-node-id="1:99"
                  >
                    Departure Time
                  </p>
                  <div
                    className="relative shrink-0 size-[calc(16*var(--unit))]"
                    data-node-id="1:100"
                    data-name="clock-3"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgClock3}
                    />
                  </div>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[calc(5*var(--unit))] items-center leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap"
                  data-node-id="1:102"
                  data-name="Time"
                >
                  <p
                    className="relative shrink-0 text-[#1e211f] text-[length:calc(38*var(--unit))]"
                    data-node-id="1:103"
                  >
                    09:30
                  </p>
                  <p
                    className="relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                    data-node-id="1:104"
                  >
                    Tomorrow morning
                  </p>
                </div>
                <div
                  className="bg-white content-stretch flex items-center justify-between overflow-clip px-[calc(12*var(--unit))] py-[calc(9*var(--unit))] relative rounded-[calc(8*var(--unit))] shrink-0 w-full"
                  data-node-id="1:105"
                  data-name="Climate status"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(11*var(--unit))] whitespace-nowrap"
                    data-node-id="1:106"
                  >
                    Pre-condition cabin
                  </p>
                  <div
                    className="h-[calc(14*var(--unit))] relative shrink-0 w-[calc(24*var(--unit))]"
                    data-node-id="1:107"
                    data-name="Toggle"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex flex-col gap-[calc(18*var(--unit))] h-full items-start relative shrink-0 w-[calc(326*var(--unit))]"
            data-node-id="1:108"
            data-name="Account rail"
          >
            <div
              className="bg-[#f8f8f5] content-stretch flex flex-col gap-[calc(20*var(--unit))] h-[calc(454*var(--unit))] items-start overflow-clip p-[calc(22*var(--unit))] relative rounded-[calc(18*var(--unit))] shadow-[0px_8px_28px_0px_rgba(30,33,31,0.07)] shrink-0 w-full"
              data-node-id="1:109"
              data-name="Vehicle history"
            >
              <div
                className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="1:110"
                data-name="Card header"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-col gap-[calc(4*var(--unit))] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                  data-node-id="1:111"
                  data-name="Heading"
                >
                  <p
                    className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))] uppercase"
                    data-node-id="1:112"
                  >
                    Vehicle history
                  </p>
                  <p
                    className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(18*var(--unit))]"
                    data-node-id="1:113"
                  >
                    Your 911 at a glance
                  </p>
                </div>
                <div
                  className="relative shrink-0 size-[calc(18*var(--unit))]"
                  data-node-id="1:114"
                  data-name="ellipsis"
                >
                  <img
                    alt=""
                    className="design-icon absolute block inset-0 max-w-none"
                    src={imgEllipsis}
                  />
                </div>
              </div>
              <div
                className="content-stretch flex flex-col gap-[calc(17*var(--unit))] items-start overflow-clip relative shrink-0 w-full"
                data-node-id="1:116"
                data-name="History list"
              >
                <div
                  className="content-stretch flex gap-[calc(12*var(--unit))] items-center overflow-clip relative shrink-0 w-full"
                  data-node-id="1:117"
                  data-name="Service item"
                >
                  <div
                    className="bg-[#f5f5f1] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(8*var(--unit))] shrink-0 size-[calc(34*var(--unit))]"
                    data-node-id="1:118"
                    data-name="Item icon"
                  >
                    <div
                      className="relative shrink-0 size-[calc(15*var(--unit))]"
                      data-node-id="1:119"
                      data-name="wrench"
                    >
                      <img
                        alt=""
                        className="design-icon absolute block inset-0 max-w-none"
                        src={imgWrench}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[calc(3*var(--unit))] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap"
                    data-node-id="1:121"
                    data-name="Item details"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                      data-node-id="1:122"
                    >
                      Service visit
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:123"
                    >
                      Sep 18 · Porsche Centrum
                    </p>
                  </div>
                  <div
                    className="relative shrink-0 size-[calc(13*var(--unit))]"
                    data-node-id="1:124"
                    data-name="chevron-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronRight1}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[calc(12*var(--unit))] items-center overflow-clip relative shrink-0 w-full"
                  data-node-id="1:126"
                  data-name="Service item"
                >
                  <div
                    className="bg-[#f5f5f1] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(8*var(--unit))] shrink-0 size-[calc(34*var(--unit))]"
                    data-node-id="1:127"
                    data-name="Item icon"
                  >
                    <div
                      className="relative shrink-0 size-[calc(15*var(--unit))]"
                      data-node-id="1:128"
                      data-name="droplets"
                    >
                      <img
                        alt=""
                        className="design-icon absolute block inset-0 max-w-none"
                        src={imgDroplets}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[calc(3*var(--unit))] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap"
                    data-node-id="1:130"
                    data-name="Item details"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                      data-node-id="1:131"
                    >
                      Oil and filter
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:132"
                    >
                      Completed · 142,120 km
                    </p>
                  </div>
                  <div
                    className="relative shrink-0 size-[calc(13*var(--unit))]"
                    data-node-id="1:133"
                    data-name="chevron-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronRight1}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[calc(12*var(--unit))] items-center overflow-clip relative shrink-0 w-full"
                  data-node-id="1:135"
                  data-name="Service item"
                >
                  <div
                    className="bg-[#f5f5f1] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(8*var(--unit))] shrink-0 size-[calc(34*var(--unit))]"
                    data-node-id="1:136"
                    data-name="Item icon"
                  >
                    <div
                      className="relative shrink-0 size-[calc(15*var(--unit))]"
                      data-node-id="1:137"
                      data-name="shield-check"
                    >
                      <img
                        alt=""
                        className="design-icon absolute block inset-0 max-w-none"
                        src={imgShieldCheck}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[calc(3*var(--unit))] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap"
                    data-node-id="1:139"
                    data-name="Item details"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                      data-node-id="1:140"
                    >
                      Vehicle check
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:141"
                    >
                      No issues detected
                    </p>
                  </div>
                  <div
                    className="relative shrink-0 size-[calc(13*var(--unit))]"
                    data-node-id="1:142"
                    data-name="chevron-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronRight1}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex gap-[calc(12*var(--unit))] items-center overflow-clip relative shrink-0 w-full"
                  data-node-id="1:144"
                  data-name="Service item"
                >
                  <div
                    className="bg-[#f5f5f1] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(8*var(--unit))] shrink-0 size-[calc(34*var(--unit))]"
                    data-node-id="1:145"
                    data-name="Item icon"
                  >
                    <div
                      className="relative shrink-0 size-[calc(15*var(--unit))]"
                      data-node-id="1:146"
                      data-name="file-text"
                    >
                      <img
                        alt=""
                        className="design-icon absolute block inset-0 max-w-none"
                        src={imgFileText}
                      />
                    </div>
                  </div>
                  <div
                    className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[calc(3*var(--unit))] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap"
                    data-node-id="1:148"
                    data-name="Item details"
                  >
                    <p
                      className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                      data-node-id="1:149"
                    >
                      Documents
                    </p>
                    <p
                      className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                      data-node-id="1:150"
                    >
                      Registration and insurance
                    </p>
                  </div>
                  <div
                    className="relative shrink-0 size-[calc(13*var(--unit))]"
                    data-node-id="1:151"
                    data-name="chevron-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgChevronRight1}
                    />
                  </div>
                </div>
              </div>
              <div
                className="h-0 relative shrink-0 w-full"
                data-node-id="1:153"
                data-name="Divider"
              >
                <div className="absolute inset-[-1px_0_0_0]">
                  <img
                    alt=""
                    className="design-icon block max-w-none"
                    src={imgDivider}
                  />
                </div>
              </div>
              <div
                className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="1:154"
                data-name="History action"
              >
                <p
                  className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))] whitespace-nowrap"
                  data-node-id="1:155"
                >
                  Updated 8 min ago
                </p>
                <div
                  className="bg-[#139b58] content-stretch flex gap-[calc(7*var(--unit))] items-center overflow-clip px-[calc(17*var(--unit))] py-[calc(10*var(--unit))] relative rounded-[calc(999*var(--unit))] shrink-0"
                  data-node-id="1:156"
                  data-name="See all"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[length:calc(12*var(--unit))] text-white whitespace-nowrap"
                    data-node-id="1:157"
                  >
                    See all
                  </p>
                  <div
                    className="relative shrink-0 size-[calc(13*var(--unit))]"
                    data-node-id="1:158"
                    data-name="arrow-right"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgArrowRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-[#f8f8f5] content-stretch flex flex-[1_0_0] flex-col gap-[calc(20*var(--unit))] items-start min-h-px overflow-clip p-[calc(22*var(--unit))] relative rounded-[calc(18*var(--unit))] shadow-[0px_8px_28px_0px_rgba(30,33,31,0.07)] w-full"
              data-node-id="1:160"
              data-name="Connect services"
            >
              <div
                className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="1:161"
                data-name="Card header"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-col gap-[calc(4*var(--unit))] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                  data-node-id="1:162"
                  data-name="Heading"
                >
                  <p
                    className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))] uppercase"
                    data-node-id="1:163"
                  >
                    Porsche Connect
                  </p>
                  <p
                    className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1e211f] text-[length:calc(18*var(--unit))]"
                    data-node-id="1:164"
                  >
                    Make Car Connected
                  </p>
                </div>
                <div
                  className="relative shrink-0 size-[calc(8*var(--unit))]"
                  data-node-id="1:165"
                  data-name="Connection status"
                >
                  <img
                    alt=""
                    className="design-icon absolute block inset-0 max-w-none"
                    src={imgConnectionStatus}
                  />
                </div>
              </div>
              <p
                className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.55] not-italic relative shrink-0 text-[#7c817c] text-[length:calc(12*var(--unit))] w-full"
                data-node-id="1:166"
              >
                Your car is online. Remote services and live vehicle data are
                available.
              </p>
              <div
                className="content-stretch flex gap-[calc(11*var(--unit))] items-center overflow-clip relative shrink-0 w-full"
                data-node-id="1:167"
                data-name="Account manager"
              >
                <div
                  className="bg-[#242725] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(999*var(--unit))] shrink-0 size-[calc(38*var(--unit))]"
                  data-node-id="1:168"
                  data-name="Avatar"
                >
                  <p
                    className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[length:calc(11*var(--unit))] text-white whitespace-nowrap"
                    data-node-id="1:169"
                  >
                    EK
                  </p>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal gap-[calc(2*var(--unit))] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap"
                  data-node-id="1:170"
                  data-name="Contact"
                >
                  <p
                    className="relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                    data-node-id="1:171"
                  >
                    Emma Kovács
                  </p>
                  <p
                    className="relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                    data-node-id="1:172"
                  >
                    Your service advisor
                  </p>
                </div>
                <div
                  className="bg-[#dff1e6] content-stretch flex items-center justify-center overflow-clip relative rounded-[calc(999*var(--unit))] shrink-0 size-[calc(34*var(--unit))]"
                  data-node-id="1:173"
                  data-name="Contact action"
                >
                  <div
                    className="relative shrink-0 size-[calc(15*var(--unit))]"
                    data-node-id="1:174"
                    data-name="message-circle"
                  >
                    <img
                      alt=""
                      className="design-icon absolute block inset-0 max-w-none"
                      src={imgMessageCircle}
                    />
                  </div>
                </div>
              </div>
              <div
                className="content-stretch flex items-end justify-between overflow-clip relative shrink-0 w-full"
                data-node-id="1:176"
                data-name="Connection details"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular'] font-normal gap-[calc(3*var(--unit))] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap"
                  data-node-id="1:177"
                  data-name="Status"
                >
                  <p
                    className="relative shrink-0 text-[#adb1ac] text-[length:calc(11*var(--unit))]"
                    data-node-id="1:178"
                  >
                    Connection status
                  </p>
                  <p
                    className="relative shrink-0 text-[#1e211f] text-[length:calc(12*var(--unit))]"
                    data-node-id="1:179"
                  >
                    Online and secured
                  </p>
                </div>
                <div
                  className="relative shrink-0 size-[calc(18*var(--unit))]"
                  data-node-id="1:180"
                  data-name="wifi"
                >
                  <img
                    alt=""
                    className="design-icon absolute block inset-0 max-w-none"
                    src={imgWifi}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
