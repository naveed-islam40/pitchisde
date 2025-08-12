import { TabPanel } from "@headlessui/react";
import React from "react";
import { BiSolidStopwatch } from "react-icons/bi";

const CommentaryInfo = ({ comments }: { comments: any[] }) => {
  return (
    <div>
      <TabPanel
        style={{ scrollbarWidth: "thin" }}
        className={" px-6 mx-auto max-h-[768px] overflow-auto mb-4 space-y-4"}
      >
        {comments
          ? comments
              .filter((comment) => comment.minute)
              .sort((a, b) => b?.minute - a?.minute)
              .map((comment) => (
                <div key={comment.id} className="gap-4 flex">
                  <div>
                    <span
                      className={`relative ${
                        comment.is_important && "bg-x-green-2 text-white"
                      } text-black font-semibold rounded-full inline-flex items-center justify-center  size-10`}
                    >
                      {comment.minute ? (
                        `${comment?.minute}'`
                      ) : (
                        <BiSolidStopwatch fill="white" size={24} />
                      )}
                      {comment.extra_minute && (
                        <span className="absolute text-xs leading-4 px-1 text-white font-medium bg-x-green-2  rounded-full border border-white -bottom-1 -right-2">
                          +{comment.extra_minute}
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="text-base">{comment.comment}</span>
                </div>
              ))
          : null}
      </TabPanel>
    </div>
  );
};

export default CommentaryInfo;
