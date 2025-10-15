import { getTeams } from "@/app/services/teamService";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { Skeleton } from "@/components/ui/skeleton";

interface Team {
  name: string;
  position: string;
  picture: string;
  skills: { id: number; name: string }[];
}

const MentorSkeleton = () => (
  <div className="flex flex-col mx-auto gap-5 w-full">
    <div className="mx-auto bg-gray-200 p-2 rounded-full">
      <Skeleton className="h-[180px] w-[180px] rounded-full" />
    </div>
    <div className="mx-auto mt-2">
      <Skeleton className="h-8 w-48" />
    </div>
    <div className="flex flex-col gap-3 mt-4 text-left">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
);

const TeamSkeleton = () => (
  <div className="flex flex-col mx-auto gap-5 w-full">
    <div className="mx-auto bg-gray-200 p-2 rounded-full">
      <Skeleton className="h-[180px] w-[180px] rounded-full" />
    </div>
    <div className="mx-auto mt-2">
      <Skeleton className="h-8 w-48" />
    </div>
  </div>
);

const MentorClientPage = () => {
  const [team, setTeam] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && effectRan.current) {
      return;
    }

    const fetchTeamData = async () => {
      try {
        const response = await getTeams(1, 100);
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-32">
          Dewan Penasihat, Pelatih Utama, & Mentor
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <MentorSkeleton key={index} />
              ))
            : team
                .filter((member) => member.position === "MENTOR")
                .map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col mx-auto gap-5 w-full"
                  >
                    <div className="mx-auto bg-green-800 p-2 rounded-full">
                      <Image
                        src={`http://20.6.8.101/${member.picture}`}
                        alt="Belajar di desa"
                        width={180}
                        height={180}
                        className="rounded-full object-cover object-top aspect-square"
                      />
                    </div>
                    <div className="mx-auto">
                      <h1 className="text-2xl text-black font-semibold">
                        {member.name}
                      </h1>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 text-left">
                      {member.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-start gap-2"
                        >
                          <CgEditBlackPoint className="text-green-800 w-3 h-3 mt-1.5" />
                          <span className="text-gray-700 w-11/12">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-32 mt-32">
          Sinari Desa Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <TeamSkeleton key={index} />
              ))
            : team
                .filter((member) => member.position === "SINARIDESA_TEAM")
                .map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col mx-auto gap-5 w-full"
                  >
                    <div className="mx-auto bg-green-800 p-2 rounded-full">
                      <Image
                        src={`http://20.6.8.101/${member.picture}`}
                        alt="Belajar di desa"
                        width={180}
                        height={180}
                        className="rounded-full object-cover object-top aspect-square"
                      />
                    </div>
                    <div className="mx-auto">
                      <h1 className="text-2xl text-black font-semibold">
                        {member.name}
                      </h1>
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </>
  );
};

export default MentorClientPage;