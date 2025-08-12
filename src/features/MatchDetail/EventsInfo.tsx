import { Block } from "@/components/Block";
import Divider from "@/components/Divider";
import CommentaryInfo from "@/components/Match/EventsInfo/CommentaryInfo";
import { TabButton } from "@/components/TabBlock";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  GoalEvent,
  RedCardEvent,
  SubstituteEvent,
  YellowCardEvent,
} from "./Events";
import {
  getPeriodLabel,
  groupEvents,
  processPeriodEvents,
  sortEvents,
} from "./matchHelpers";
import MatchStatistics from "./MatchStatistics";

export function EventsInfo({
  events,
  participants,
  comments,
  statistics,
  metadata,
}) {
  const homeTeam = participants.find(
    (participant) => participant.meta.location === "home"
  );

  const sortedEvents = sortEvents(events);

  const groupedEvents = groupEvents(sortedEvents);

  const periodDisplayOrder = [4, 3, 2, 1];

  return (
    <Block padding={false} className="shrink-0">
      <TabGroup as="div" className="overflow-auto">
        <TabList
          as="div"
          className="flex gap-1 p-1 px-1.5 bg-light rounded-full m-4"
        >
          {events ? <TabButton label="Events" /> : null}
          <TabButton label="Stats" />
          {comments && comments.length ? (
            <TabButton label="Commentary" />
          ) : null}
        </TabList>
        <TabPanels>
          {events ? (
            <TabPanel>
              <div className="space-y-6 mb-4 px-4">
                {periodDisplayOrder.map((typeId: any) => {
                  const group = groupedEvents?.[typeId];

                  if (!group || group.period.ticking) return null;

                  const processedEvents = processPeriodEvents(
                    group.events,
                    group.period
                  );

                  return (
                    <div key={group.period.type_id}>
                      <Divider label={getPeriodLabel(group.period.type_id)} />
                      <div className="space-y-4">
                        {processedEvents.map((item: any) => {
                          if (item.type === "added_time") {
                            return (
                              <div
                                key={item.id}
                                className="text-center py-2 text-sm text-x-darkgreen"
                              >
                                +{item.time} minutes
                              </div>
                            );
                          }

                          return (
                            <Event
                              isHomeTeam={item.participant_id === homeTeam.id}
                              event={item}
                              key={item.id}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );

                  return null;
                })}
              </div>
            </TabPanel>
          ) : null}

          <TabPanel>
            <MatchStatistics statistics={statistics} metadata={metadata} />
          </TabPanel>

          <CommentaryInfo comments={comments} />
        </TabPanels>
      </TabGroup>
    </Block>
  );
}

function Event({ event, isHomeTeam }) {
  const goalRegex = /^(penalty|goal|owngoal)$/;
  return (
    <>
      {event.type.code === "yellowcard" ? (
        <YellowCardEvent home={isHomeTeam} event={event} />
      ) : event.type.code === "substitution" ? (
        <SubstituteEvent home={isHomeTeam} event={event} />
      ) : goalRegex.test(event.type.code) ? (
        <GoalEvent home={isHomeTeam} event={event} />
      ) : event.type.code === "redcard" ? (
        <RedCardEvent home={isHomeTeam} event={event} />
      ) : null}
    </>
  );
}
