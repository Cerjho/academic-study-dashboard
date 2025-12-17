import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Literature Review - Academic Study',
  description: 'Review of related literature and studies on enrollment status and academic achievement',
};

/**
 * Literature Review Page
 *
 * Presents the theoretical background and research context
 * for the study on enrollment status impact.
 */

export default function LiteraturePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-2xl bg-white p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Review of Related Literature and Studies
            </h1>
          </div>

          <div className="mb-10 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border border-purple-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 shadow-md">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold text-purple-900">
                  Research Context
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  This section presents the theoretical background and research context that inform 
                  the study on the impact of enrollment status on academic achievement among 
                  Computer Science students.
                </p>
              </div>
            </div>
          </div>

          {/* Related Literature Section */}
          <section className="mb-10">
            <div className="mb-6 flex items-center gap-3">
              <svg className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-800">
                Related Literature
              </h2>
            </div>

            <div className="space-y-5">
              {/* Study 1 */}
              <div className="group rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <h3 className="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
                  Lived Experiences and Challenges of Irregular Students
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Irregular students, commonly referred to as shifters or transferees, encounter distinct academic and social challenges compared to regular students. A phenomenological study conducted in private higher education institutions in the Philippines explored the lived experiences of irregular students and revealed that they frequently struggle with conflicting class schedules, social isolation, and difficulties in forming stable peer relationships.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Unlike regular students who benefit from block sectioning and consistent peer support, irregular students must continuously adjust to new classmates and learning environments. This situation often results in feelings of anxiety, academic disconnection, and the perception of being left behind academically. The fragmentation of both social and academic experiences was identified as a significant factor that threatens academic consistency and persistence among irregular students.
                  </p>
                </div>
              </div>

              {/* Study 2 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Irregular Attendance and Academic Achievement
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Attendance plays a crucial role in students&apos; academic success. Khanal (2019) examined irregular class attendance among university students and its relationship to academic achievement using a descriptive mixed-methods approach. The study found that irregular attendance was prevalent and that there was a positive and statistically significant relationship between regular class attendance and higher academic performance.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Students who attended classes more consistently achieved better academic outcomes compared to those with frequent absences. The study also identified institutional, socioeconomic, and personal factors—such as employment responsibilities and scheduling conflicts—as major contributors to irregular attendance. The findings highlight the need for coordinated institutional strategies to reduce absenteeism and support students at risk of poor academic performance.
                  </p>
                </div>
              </div>

              {/* Study 3 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Academic Challenges of Irregular Students
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    Another study published in the International Journal of Research Publication and Reviews investigated the academic challenges faced by irregular students in higher education. Using a descriptive qualitative research design, the study revealed that irregular students commonly experience schedule conflicts, limited access to academic support, reduced peer interaction, and increased stress levels.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These challenges were found to negatively affect students&apos; academic performance, class participation, and motivation. The study concluded that irregular enrollment status contributes to academic instability and emphasized the importance of institutional support mechanisms to improve the academic outcomes of irregular students. This literature supports the premise that enrollment status is a significant factor influencing academic achievement in higher education.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Studies Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Related Studies
            </h2>

            <div className="space-y-6">
              {/* Study 4 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  School Attendance and Academic Performance
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    A quantitative study conducted in Uganda investigated the relationship between school attendance and academic performance under the Universal Primary Education program. The researchers compared the academic outcomes of regularly attending students and those with irregular attendance patterns.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The findings showed that irregular attendance significantly lowered academic achievement by disrupting learning continuity, reducing classroom participation and teacher–student interaction, and limiting mastery of subject content. These results directly support the present study, as they demonstrate that inconsistent attendance negatively affects academic performance. The study reinforces the assumption that enrollment status and attendance patterns play a critical role in determining students&apos; academic achievement, particularly among Computer Science students at Mabini College.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* References Section */}
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              References
            </h2>

            <div className="rounded-lg border border-gray-200 p-5">
              <ul className="space-y-4 text-sm text-gray-700">
                <li>
                  Khanal, S. P. (2019). Irregular attendance of university students at class and its relation to their academic achievement. <em>Tribhuvan University Journal, 33</em>(1), 115–128. <a href="https://doi.org/10.3126/tuj.v33i1.28687" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://doi.org/10.3126/tuj.v33i1.28687</a>
                </li>
                <li>
                  Author(s). (Year). Lived experiences of irregular students in private higher education institution. <a href="https://www.researchgate.net/publication/391596298" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.researchgate.net/publication/391596298</a>
                </li>
                <li>
                  Author(s). (Year). Challenges faced by irregular students and their academic performance. <em>International Journal of Research Publication and Reviews</em>. <a href="https://ijrpr.com/uploads/V6ISSUE4/IJRPR43482.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://ijrpr.com/uploads/V6ISSUE4/IJRPR43482.pdf</a>
                </li>
                <li>
                  Author(s). (Year). Investigating the relationship between school attendance and academic performance in universal primary education: The case of Uganda. <a href="https://files.eric.ed.gov/fulltext/EJ1252243.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://files.eric.ed.gov/fulltext/EJ1252243.pdf</a>
                </li>
              </ul>
            </div>
          </section>

        </article>
      </div>
    </main>
  );
}
