import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'References - Academic Study',
  description: 'APA-formatted citations and academic references',
};

/**
 * References Page
 *
 * Displays APA-formatted citations for all sources
 * referenced in the academic study.
 */

export default function ReferencesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <article className="rounded-lg bg-white p-8 shadow">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">References</h1>

          <p className="mb-8 text-gray-600">
            The following sources informed the theoretical framework,
            methodology, and interpretation of this study. Citations follow the
            American Psychological Association (APA) 7th edition format.
          </p>

          {/* Theoretical Framework */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Theoretical Framework
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Dweck, C. S. (1986). <em>Motivational processes affecting learning</em>.
                American Psychologist, 41(10), 1040–1048.
                https://doi.org/10.1037/0003-066X.41.10.1040
              </p>
              <p className="leading-relaxed">
                Tinto, V. (1975). Dropout from higher education: A theoretical
                synthesis of recent research. <em>Review of Educational Research</em>,
                45(1), 89–125. https://doi.org/10.3102/00346543045001089
              </p>
              <p className="leading-relaxed">
                Tinto, V. (1993). <em>Leaving college: Rethinking the causes and cures of student attrition</em> (2nd ed.). University of Chicago Press.
              </p>
            </div>
          </section>

          {/* Academic Achievement Studies */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Academic Achievement & Enrollment Status
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Adelman, C. (2006). <em>The toolbox revisited: Paths to degree completion from high school through college</em>. U.S. Department of Education.
              </p>
              <p className="leading-relaxed">
                Ishitani, T. T. (2006). Studying attrition and degree completion
                behavior among first-generation college students in the United
                States. <em>Journal of Higher Education</em>, 77(5), 861–885.
                https://doi.org/10.1353/jhe.2006.0042
              </p>
              <p className="leading-relaxed">
                Kuh, G. D., Kinzie, J., Buckley, J. A., Bridges, B. K., & Hayek,
                J. C. (2007). <em>Piecing together the student success puzzle: Research, propositions, and recommendations</em>. ASHE Higher Education Report, 32(5).
                Jossey-Bass.
              </p>
              <p className="leading-relaxed">
                McCormick, A. C., & Carroll, C. D. (1997). <em>Transfer behavior among beginning postsecondary students: 1989–94</em> (NCES 97-266). U.S.
                Department of Education, National Center for Education
                Statistics.
              </p>
            </div>
          </section>

          {/* Study Habits Research */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Study Habits & Learning Strategies
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., &
                Willingham, D. T. (2013). Improving students&apos; learning with
                effective learning techniques: Promising directions from
                cognitive and educational psychology. <em>Psychological Science in the Public Interest</em>, 14(1), 4–58.
                https://doi.org/10.1177/1529100612453266
              </p>
              <p className="leading-relaxed">
                Pintrich, P. R. (2004). A conceptual framework for assessing
                motivation and self-regulated learning in college students.{' '}
                <em>Educational Psychology Review</em>, 16(4), 385–407.
                https://doi.org/10.1007/s10648-004-0006-x
              </p>
              <p className="leading-relaxed">
                Schunk, D. H., & Zimmerman, B. J. (Eds.). (2012).{' '}
                <em>Motivation and self-regulated learning: Theory, research, and applications</em>. Routledge.
              </p>
              <p className="leading-relaxed">
                Zimmerman, B. J. (2002). Becoming a self-regulated learner: An
                overview. <em>Theory Into Practice</em>, 41(2), 64–70.
                https://doi.org/10.1207/s15430421tip4102_2
              </p>
            </div>
          </section>

          {/* Statistical Methods */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Statistical Methodology
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Cohen, J. (1988). <em>Statistical power analysis for the behavioral sciences</em> (2nd ed.). Lawrence Erlbaum Associates.
              </p>
              <p className="leading-relaxed">
                Field, A. (2018). <em>Discovering statistics using IBM SPSS statistics</em> (5th ed.). SAGE Publications.
              </p>
              <p className="leading-relaxed">
                Gravetter, F. J., & Wallnau, L. B. (2017).{' '}
                <em>Statistics for the behavioral sciences</em> (10th ed.).
                Cengage Learning.
              </p>
              <p className="leading-relaxed">
                Tabachnick, B. G., & Fidell, L. S. (2019).{' '}
                <em>Using multivariate statistics</em> (7th ed.). Pearson.
              </p>
            </div>
          </section>

          {/* Research Design */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Research Design & Educational Research
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Creswell, J. W., & Creswell, J. D. (2018).{' '}
                <em>Research design: Qualitative, quantitative, and mixed methods approaches</em> (5th ed.). SAGE Publications.
              </p>
              <p className="leading-relaxed">
                Fraenkel, J. R., Wallen, N. E., & Hyun, H. H. (2019).{' '}
                <em>How to design and evaluate research in education</em> (10th
                ed.). McGraw-Hill Education.
              </p>
              <p className="leading-relaxed">
                Mertens, D. M. (2020). <em>Research and evaluation in education and psychology: Integrating diversity with quantitative, qualitative, and mixed methods</em> (5th ed.). SAGE Publications.
              </p>
            </div>
          </section>

          {/* Ethics & Privacy */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Research Ethics & Privacy
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                American Educational Research Association. (2011).{' '}
                <em>Code of ethics</em>. Educational Researcher, 40(3), 145–156.
                https://doi.org/10.3102/0013189X11410403
              </p>
              <p className="leading-relaxed">
                National Commission for the Protection of Human Subjects of
                Biomedical and Behavioral Research. (1979).{' '}
                <em>The Belmont Report: Ethical principles and guidelines for the protection of human subjects of research</em>. U.S. Department of
                Health and Human Services.
              </p>
              <p className="leading-relaxed">
                Sieber, J. E., & Tolich, M. B. (2013).{' '}
                <em>Planning ethically responsible research</em> (2nd ed.).
                SAGE Publications.
              </p>
            </div>
          </section>

          {/* Data Visualization */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Data Visualization & Presentation
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Cairo, A. (2016). <em>The truthful art: Data, charts, and maps for communication</em>. New Riders.
              </p>
              <p className="leading-relaxed">
                Few, S. (2012). <em>Show me the numbers: Designing tables and graphs to enlighten</em> (2nd ed.). Analytics Press.
              </p>
              <p className="leading-relaxed">
                Tufte, E. R. (2001). <em>The visual display of quantitative information</em> (2nd ed.). Graphics Press.
              </p>
              <p className="leading-relaxed">
                Wilkinson, L. (2005). <em>The grammar of graphics</em> (2nd ed.).
                Springer.
              </p>
            </div>
          </section>

          {/* Philippine Context */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Philippine Higher Education Context
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                Commission on Higher Education. (2017). <em>CMO No. 46, Series of 2012: Policy-standard to enhance quality assurance (QA) in Philippine higher education through an outcomes-based and typology-based QA</em>. CHED.
              </p>
              <p className="leading-relaxed">
                Manalo, R. B., & Soriano-de-Guia, G. (2020). Factors affecting
                the academic performance of college students in the Philippines.{' '}
                <em>International Journal of Advanced Research and Publications</em>,
                4(6), 125–132.
              </p>
              <p className="leading-relaxed">
                Tus, J. (2020). Academic stress, academic motivation, and its
                relationship on the academic performance of the senior high
                school students. <em>Asian Journal of Multidisciplinary Studies</em>,
                3(1), 92–100.
              </p>
            </div>
          </section>

          {/* Computer Science Education */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Computer Science Education
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                ACM/IEEE-CS Joint Task Force on Computing Curricula. (2013).{' '}
                <em>Computer Science Curricula 2013: Curriculum guidelines for undergraduate degree programs in computer science</em>. Association for
                Computing Machinery.
              </p>
              <p className="leading-relaxed">
                Beaubouef, T., & Mason, J. (2005). Why the high attrition rate
                for computer science students: Some thoughts and observations.{' '}
                <em>ACM SIGCSE Bulletin</em>, 37(2), 103–106.
                https://doi.org/10.1145/1083431.1083474
              </p>
              <p className="leading-relaxed">
                Robins, A., Rountree, J., & Rountree, N. (2003). Learning and
                teaching programming: A review and discussion.{' '}
                <em>Computer Science Education</em>, 13(2), 137–172.
                https://doi.org/10.1076/csed.13.2.137.14200
              </p>
            </div>
          </section>

          {/* Additional Resources */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Additional Resources
            </h2>
            <div className="space-y-4 pl-8 text-gray-700" style={{ textIndent: '-2rem', paddingLeft: '2rem' }}>
              <p className="leading-relaxed">
                American Psychological Association. (2020).{' '}
                <em>Publication manual of the American Psychological Association</em> (7th ed.). American Psychological Association.
              </p>
              <p className="leading-relaxed">
                Slovin, E. (1960). <em>Slovin&apos;s formula for sampling technique</em>.
                Retrieved from https://www.statisticshowto.com/
              </p>
            </div>
          </section>

          {/* Note */}
          <div className="mt-8 rounded-lg bg-gray-100 p-4 border border-gray-300">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> All references are formatted according to
              APA 7th edition guidelines. For additional information or to
              request specific citations, please contact the research team.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
