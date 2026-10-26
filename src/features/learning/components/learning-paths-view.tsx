"use client";

import * as React from "react";
import { LEARNING_RESOURCES } from "../config/learning-resources";
import { LEARNING_TRACKS } from "../config/learning-tracks";
import { TrackId } from "../types";
import { LearningPathTabs } from "./learning-path-tabs";
import { LearningResourceCard } from "./learning-resource-card";

export function LearningPathsView() {
  const [selectedTrack, setSelectedTrack] = React.useState<TrackId>("all");

  const categoryTracks = React.useMemo(() => {
    return LEARNING_TRACKS.filter((t) => t.id !== "all");
  }, []);

  return (
    <div className="space-y-8">
      {/* 6 Category Tabs */}
      <section>
        <LearningPathTabs
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
        />
      </section>

      {/* Content Rendering */}
      {selectedTrack === "all" ? (
        <div className="space-y-10">
          {categoryTracks.map((track) => {
            const trackResources = LEARNING_RESOURCES.filter(
              (r) => r.trackId === track.id
            );

            if (trackResources.length === 0) return null;

            return (
              <section key={track.id} className="space-y-4">
                <div className="border-b pb-2">
                  <h2 className="font-heading text-lg font-semibold tracking-tight">
                    {track.label}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {track.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {trackResources.map((resource) => (
                    <LearningResourceCard
                      key={resource.id}
                      resource={resource}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="space-y-4">
          <div className="border-b pb-2">
            <h2 className="font-heading text-lg font-semibold tracking-tight">
              {LEARNING_TRACKS.find((t) => t.id === selectedTrack)?.label}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {LEARNING_TRACKS.find((t) => t.id === selectedTrack)?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING_RESOURCES.filter((r) => r.trackId === selectedTrack).map(
              (resource) => (
                <LearningResourceCard key={resource.id} resource={resource} />
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
}
